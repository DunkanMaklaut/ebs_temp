"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/config";
import "./loginScreen.css";
import AcceptButton from "@components/acceptButton/acceptButton";
import Button from "@components/button/button";
import LogoEBS from "@components/logo/logoEbs.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Здесь будет запрос к вашему API
      const response = await fetch(API_BASE_URL + "/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: email, password: password }),
      });

      const data = await response.text().toString();

      if (response.ok) {
        // Сохраняем токен (пример для кук)
        document.cookie = `token=${data}; path=/; max-age=${
          60 * 60 * 24
        }; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`;
        router.push("/profile");
      } else {
        setError(data.message || "Ошибка авторизации");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером " + err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-[#FFFFFF] rounded-[14px] min-w-[500px] max-w-sm mx-auto flex flex-col justify-center py-12 sm:px-6 lg:px-8 gap-12">
        <div className="flex max-w-sm flex-col justify-center mx-auto">
          <LogoEBS />
        </div>

        <div className="fieldsForms">
          {error && (
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
                  <p className="text-sm text-red-700"> {error}</p>
                </div>
              </div>
            </div>
          )}

          <h3 className="text-darkGray text-center text-2xl font-bold  font-black">
            Авторизация
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="formField">
              <label htmlFor="email" className="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className=" bg-[#F6F7F8] mt-1 appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="formField">
              <label htmlFor="password" className="password">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className=" bg-[#F6F7F8] mt-1 appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-4 text-center flex flex-col space-y-6">
              <AcceptButton disabled={isLoading} type="submit">
                {isLoading ? "Вход..." : "Войти"}
              </AcceptButton>

              <Link
                href="/register"
                className="font-medium text-grey-600 hover:text-blue-500"
              >
                Создать аккаунт
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
