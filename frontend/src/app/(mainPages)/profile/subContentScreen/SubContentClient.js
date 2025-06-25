"use client";

import React, { useState } from "react";
import { CustomInput } from "../components/CustomInput";

export const SubContentClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const statusOptions = [
    { value: "", label: "Все статусы" },
    { value: "1", label: "Подтвержден" },
    { value: "2", label: "Ожидает" },
    { value: "3", label: "Отклонен" },
  ];

  const statusStudent = { 1: "Подтвержден", 2: "Отклонен", 3: "Ожидает" };

  const contentRole = (role) => {
    switch (role) {
      case 1:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Подтвержден
          </span>
        );
      case 2:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Ожидает
          </span>
        );
      case 3:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Отклонен
          </span>
        );
      default:
        return null;
    }
  };

  const students = [
    {
      id: 1,
      fullName: "Александров Николай",
      status: 1,
      role: "Студент",
      dataRegistration: "10.04.2025",
      email: "alexandrov.nikolai@mail.ru",
    },
    {
      id: 2,
      fullName: "Кеавеахеулуокалани Камехамехаокалани",
      status: 2,
      role: "Студент",
      dataRegistration: "11.04.2025",
      email: "kamehameha@example.com",
    },
    {
      id: 3,
      fullName: "Константинопольский Александр Владимирович",
      status: 3,
      role: "Студент",
      dataRegistration: "12.04.2025",
      email: "konstantinopolsky@mail.ru",
    },
    {
      id: 6,
      fullName: "Смирнова Екатерина Андреевна",
      status: 1,
      role: "Студент",
      dataRegistration: "08.04.2025",
      email: "smirnova.ekaterina@gmail.com",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter
      ? student.status.toString() === statusFilter
      : true;
    return matchesSearch && matchesStatus;
  });

  const handleSelectStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApprove = () => {
    console.log("Приняты заявки:", selectedStudents);
    // Здесь логика принятия заявок
  };

  const handleReject = () => {
    console.log("Отклонены заявки:", selectedStudents);
    // Здесь логика отклонения заявок
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-2.5">
        <CustomInput
          title="Поиск"
          classNameAllBlock="w-[70%]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="w-[30%]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Статус
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-2">
        <button
          onClick={handleReject}
          disabled={selectedStudents.length === 0}
          className={`w-[150px] h-[44px] rounded-lg transition-colors
            ${
              selectedStudents.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
            }
          `}
        >
          Отклонить
        </button>
        <button
          onClick={handleApprove}
          disabled={selectedStudents.length === 0}
          className={`w-[150px] h-[44px] rounded-lg transition-colors
            ${
              selectedStudents.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800"
            }
          `}
        >
          Принять
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStudents(students.map((s) => s.id));
                    } else {
                      setSelectedStudents([]);
                    }
                  }}
                  checked={
                    selectedStudents.length === students.length &&
                    students.length > 0
                  }
                />
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ФИО
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Статус
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Роль
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Регистрация
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Почта
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-2 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.id}
                </td>
                <td className="px-3 py-4 text-sm text-gray-900">
                  {student.fullName}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm">
                  {contentRole(student.status)}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.role}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.dataRegistration}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
