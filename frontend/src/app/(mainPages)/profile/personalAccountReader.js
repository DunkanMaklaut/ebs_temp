"use client";
import { useState, useRef } from "react";
import { ButtonTxt } from "./components/ButtonTxt";
import Image from "next/image";
import API_BASE_URL from "@/config";
import { useAuth } from "@/app/context/AuthContext";

export default function PersonalAccountReader() {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState("/images/error404.jpg");
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    fullName: user?.fullName || "Иван Иванов",
    email: user?.email || "ivan@example.com",
    university:
      user?.organisation?.name || "Томский Политехнический Университет",
    registrationDate: "15.10.2022",
    libraryCard: "ЧБ-2022-01542",
    status: user?.status === "READY" ? "Читатель" : "Пользователь",
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleEdit = () => {
    setTempData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...tempData });
    setIsEditing(false);
    // Здесь можно вызвать API для сохранения данных
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md">
      {/* Заголовок и кнопки */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Профиль пользователя
        </h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Редактировать профиль
          </button>
        ) : (
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Сохранить изменения
            </button>
          </div>
        )}
      </div>

      {/* Основной контент */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Левая часть — аватар и статистика */}
        <div className="md:w-1/3 flex flex-col items-center">
          {/* Аватар */}
          <div
            onClick={handleAvatarClick}
            className={`relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 cursor-pointer mx-auto ${
              isEditing ? "ring-4 ring-blue-500" : ""
            }`}
          >
            <Image
              src={avatar}
              alt="Аватар пользователя"
              fill
              className="object-cover"
              priority
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity">
                <span className="text-white text-sm sm:text-base">
                  Сменить фото
                </span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />

          {/* Статистика */}
          <div className="bg-blue-50 p-4 sm:p-5 rounded-xl w-full max-w-xs mx-auto mt-4">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-blue-800">
              Статистика
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-blue-600">Книг прочитано</p>
                <p className="text-xl font-bold">12</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Активных книг</p>
                <p className="text-xl font-bold">3</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Срок действия</p>
                <p className="text-lg font-medium">До 15.10.2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Правая часть — данные профиля */}
        <div className="md:w-2/3 w-full">
          <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Основная информация
            </h2>

            {/* Форма */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1 sm:col-span-2 space-y-4 sm:space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    ФИО
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={tempData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.fullName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Почта
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.email}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    ВУЗ
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="university"
                      value={tempData.university}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.university}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Дата регистрации
                  </label>
                  <p className="text-gray-800">{userData.registrationDate}</p>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Читательский билет
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="libraryCard"
                      value={tempData.libraryCard}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.libraryCard}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Статус
                  </label>
                  <div className="flex items-center gap-2 pt-2">
                    <p className="text-gray-800">{userData.status}</p>
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        userData.status === "Читатель"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительные настройки */}
          <div className="mt-6 bg-gray-50 p-4 sm:p-6 rounded-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Дополнительные настройки
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200 pb-3">
                <span className="text-gray-700 text-sm sm:text-base">
                  Уведомления по email
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 ease-in-out"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-200 pb-3">
                <span className="text-gray-700 text-sm sm:text-base">
                  Темная тема
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 ease-in-out"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
