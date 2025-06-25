"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

export default function PersonalAccountStaff() {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState("/images/LogoEbs.svg");
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({
    fullName: "Иванов Иван Иванович",
    email: "publisher@university.edu",
    role: user.role == "LIBRARIAN" ? "Библиотекарь" : "Издатель",
    organization: user.organisationName, //"Университетское издательство",
    registrationDate: "15.10.2022",
    contactPhone: "+7 (123) 456-78-90",
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleEdit = () => {
    setTempData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...tempData });
    setIsEditing(false);
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

  // Статистика в зависимости от роли
  const stats = {
    Издатель: [
      { title: "Издано книг", value: "24" },
      { title: "В процессе", value: "5" },
      { title: "Новых заявок", value: "3" },
    ],
    Библиотекарь: [
      { title: "Обработано заявок", value: "142" },
      { title: "Новых поступлений", value: "17" },
      { title: "Читателей", value: "324" },
    ],
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Профиль {userData.role.toLowerCase()}
        </h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Редактировать профиль
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Сохранить
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-10">
        {/* Левая колонка - аватар и статистика */}
        <div className="w-1/3">
          <div
            onClick={handleAvatarClick}
            className={`relative w-48 h-48 rounded-full overflow-hidden mb-6 cursor-pointer mx-auto ${
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
                <span className="text-white font-medium">Сменить фото</span>
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

          <div className="bg-blue-50 p-5 rounded-xl">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              Статистика
            </h3>
            <div className="space-y-4">
              {stats[userData.role].map((stat, index) => (
                <div key={index}>
                  <p className="text-sm text-blue-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка - информация */}
        <div className="w-2/3">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Основная информация
            </h2>

            <div className="grid grid-cols-2 gap-6">
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
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-800 py-2">
                    {userData.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Роль
                </label>
                <p className="text-lg text-gray-800 py-2">{userData.role}</p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  {userData.role === "Издатель"
                    ? "Издательство"
                    : "Организация"}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="organization"
                    value={tempData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-800 py-2">
                    {userData.organization}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tempData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-800 py-2">{userData.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Телефон
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="contactPhone"
                    value={tempData.contactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-lg text-gray-800 py-2">
                    {userData.contactPhone}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Дата регистрации
                </label>
                <p className="text-lg text-gray-800 py-2">
                  {userData.registrationDate}
                </p>
              </div>
            </div>
          </div>

          {/* Дополнительные функции */}
          <div className="mt-6 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Действия
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {userData.role === "Издатель" ? (
                <>
                  <button className="px-4 py-3 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Добавить новое издание
                  </button>
                  <button className="px-4 py-3 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Просмотреть заявки
                  </button>
                </>
              ) : (
                <>
                  <button className="px-4 py-3 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Управление каталогом
                  </button>
                  <button className="px-4 py-3 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Обработка заявок
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
