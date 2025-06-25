"use client";
import React from "react";
import { CustomInput } from "./components/CustomInput";
import { MainCardInfo } from "./components/MainCardInfo";

export const UserManagement = () => {
  const students = [
    {
      id: 1,
      fullName: "Александров Николай",
      status: 1,
      role: "Студент",
      dataRegistration: "10.04.2025",
      email: "Alexandron.Nikolai@mail.ru",
    },
    {
      id: 2,
      fullName:
        "Кеавеахеулуокалани Камехамехаокалани Лланаафрпуллуингиллгог...",
      status: 2,
      role: "Студент",
      dataRegistration: "10.04.2025",
      email: "Alexandron.Nikolai@mail.ru",
    },
    {
      id: 3,
      fullName: "	Константинопольский Александр Владимирович",
      status: 3,
      role: "Студент",
      dataRegistration: "10.04.2025",
      email: "Alexandron.Nikolai@mail.ru",
    },
  ];

  return (
    <MainCardInfo>
      <h2 className="text-gray-700 font-bold text-4xl">
        Управление пользователями
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2.5">
          <CustomInput
            title={"Поиск"}
            classNameAllBlock="w-[70%]"
          ></CustomInput>
        </div>
        <div className="flex flex-row justify-end gap-1">
          <button
            className={
              "w-[150] h-[44] bg-gray-200 text-gray-700 rounded-lg hover:text-white hover:bg-blue-500"
            }
          >
            отклонить
          </button>
          <button
            className={
              "w-[150] h-[44] bg-gray-200 text-gray-700 rounded-lg hover:text-white hover:bg-blue-500"
            }
          >
            принять
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ФИО
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Роль
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Регистрация
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Почта
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.dataRegistration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </MainCardInfo>
  );
};
