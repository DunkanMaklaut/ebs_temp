"use client";

import React, { useState, useEffect } from "react";
import "./register.css";
import TextField from "@components/text-field/textField.jsx";
import LogoEBS from "@components/logo/logoEbs.jsx";
import { useRouter } from "next/navigation";
import { applyTheme } from "@/app/themeUtils.js";
import { lightTheme } from "@resources/colors/colors.js";
import API_BASE_URL from "@/config";
const RegisterPage = () => {
  const router = useRouter();
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(0);
  useEffect(() => {
    applyTheme(lightTheme);

    ///Загружаем университеты
    const fetchUniversities = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_BASE_URL + "/api/register/orgList");
        if (!response.ok) {
          throw new Error("Не удалось загрузить список вузов");
        }

        const data = await response.json();
        setUniversities(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Произошла неизвестная ошибка"
        );
        setSubmitError("Не удалось загрузить данные перезагрузить страницу");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const [formData, setFormData] = useState({
    university: "",
    ticketNumber: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.university) newErrors.university = "Выберите ваш ВУЗ";
    if (!formData.ticketNumber)
      newErrors.ticketNumber = "Введите номер читательского билета";

    if (!formData.fullName) newErrors.fullName = "Введите ваше ФИО";
    else if (formData.fullName.split(" ").length < 2)
      newErrors.fullName = "Введите ФИО через пробел и хотя бы фамилию и имя";

    if (!formData.email) {
      newErrors.email = "Введите email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль должен содержать минимум 8 символов";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Необходимо согласие на обработку данных";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Отправка данных на API сервер
      const response = await fetch(API_BASE_URL + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({
          organisationId: formData.university,
          libraryCard: formData.ticketNumber,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const variantAnswer = [
        "Пользователь с таким читательским билетом уже существует",
        "Пользователь с таким email уже существует",
        "Введен некорректный email",
        "Такой организации не существует!",
        "Пароль не соответствует требованиям",
      ];
      const answerTxt = (await response.text()).toString();
      console.log("Успешная регистрация:", answerTxt);

      if (response.status != 200) {
        throw response.error;
        return;
      }

      if (variantAnswer.includes(answerTxt)) {
        throw answerTxt;
        return;
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Ошибка регистрации:", error);

      if (error.response) {
        // Ошибка от сервера
        if (error.response.data.error) {
          setSubmitError(error.response.data.error);
        } else if (error.response.status === 409) {
          setSubmitError("Пользователь с таким email уже существует");
        } else {
          setSubmitError("Произошла ошибка при регистрации");
        }
      } else {
        error.length < 0
          ? setSubmitError("Не удалось подключиться к серверу")
          : setSubmitError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LogoEBS className=" mb-8" />

            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Регистрация завершена успешно!
            </h1>
            <p className="text-gray-600 mb-6">
              На вашу почту {formData.email} отправлено письмо с подтверждением.
            </p>
            <a
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Войти в систему
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-6">
        <div className="flex flex-col justify-center sm:px-6 lg:px-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <LogoEBS />
            <h1 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Регистрация
            </h1>
          </div>
          {submitError && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="university"
                className="block text-sm font-medium text-gray-700"
              >
                ВУЗ
              </label>
              <select
                id="university"
                name="university"
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
                  errors.university ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                value={formData.university}
                onChange={handleChange}
              >
                {universities.map((univers) => {
                  return (
                    <option key={univers.id} value={univers.id}>
                      {univers.name}
                    </option>
                  );
                })}
              </select>
              {errors.university && (
                <p className="mt-1 text-sm text-red-600">{errors.university}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="ticketNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Номер читательского билета
              </label>
              <input
                id="ticketNumber"
                name="ticketNumber"
                type="text"
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                  errors.ticketNumber ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Номер читательского билета"
                value={formData.ticketNumber}
                onChange={handleChange}
              />
              {errors.ticketNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ticketNumber}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                ФИО
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="ФИО"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Подтверждение пароля
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Подтверждение пароля"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  className={`h-4 w-4 ${
                    errors.agreeToTerms
                      ? "text-red-600 border-red-500"
                      : "text-blue-600 border-gray-300"
                  } focus:ring-blue-500 rounded`}
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="agreeToTerms"
                  className="font-medium text-gray-700"
                >
                  Согласен на обработку персональных данных
                </label>
              </div>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Обработка...
                  </>
                ) : (
                  "Зарегистрироваться"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              У меня есть аккаунт
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  /*<div className="registerPage full-screen-center">
      <div className="register-form-rectangle">
        <LogoEBS />
        <div className="register-title">Регистрация</div>
        <div className="register-grid-container">
          <div className="textFieldContainer">
            <label className="labelText">Email</label>
            <TextField
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="custom-text-field"
              placeholder="Email"
            />
          </div>

          <div className="textFieldContainer">
            <label className="labelText">Пароль</label>
            <TextField
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="custom-text-field"
              placeholder="Пароль"
            />
          </div>

          <div className="textFieldContainer">
            <label className="labelText">Подтверждение пароля</label>
            <TextField
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="custom-text-field"
              placeholder="Подтверждение пароля"
            />
          </div>

          <div className="textFieldContainer">
            <label className="labelText">Ключ регистрации</label>
            <TextField
              value={formData.registrationKey}
              onChange={(e) => handleInputChange('registrationKey', e.target.value)}
              className="custom-text-field"
              placeholder="Ключ регистрации"
            />
          </div>
        </div>

        <button className="registration-button" onClick={handleRegisterClick}>
          Зарегистрироваться
        </button>
        <button className="authorization-button" onClick={handleLoginRedirect}>
          У меня уже есть аккаунт
        </button>
      </div>
    </div>
  );*/
};

export default RegisterPage;
