"use client";

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Header from "@components/header/Header";
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs";
import { lightTheme } from "@resources/colors/colors.js";

const buttonsForLibrarian = [
  { id: "profile", label: "Личная информация" },
  { id: "applications", label: "Заявки" },
  { id: "bookCatalog", label: "Каталог книг" },
  { id: "userManagement", label: "Управление пользователями" },
  { id: "reportsAndStatistics", label: "Отчёты и статистика" },
];

const buttonsForPublisher = [{ id: "profile", label: "Личная информация" }];
const buttonsForReaders = [
  { id: "profile", label: "Личная информация" },
  { id: "history", label: "История" },
  { id: "myCollection", label: "Мои подборки" },
];

const CustomInput = ({ title, value, ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-normal">{title}</label>
      <div className="mt-1">
        <input
          value={value}
          {...props}
          className=" block w-full rounded-md 
            border border-gray-300 
            px-3 py-2 
            text-gray-600 
            focus:border-blue-500 
            focus:outline-none 
            focus:ring-1
            focus:ring-blue-500 
            sm:text-sm"
        />
      </div>
    </div>
  );
};

const ButtonTxt = ({ key, onClick, className, children, ...props }) => {
  return (
    <button
      key={key}
      onClick={onClick}
      className={`${className} px-2 py-4  text-left text-sm font-medium rounded-lg transition-colors duration-200 `}
      {...props}
    >
      {children}
    </button>
  );
};

const Sidebar = ({ buttons, activeComponent, setActiveComponent }) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-sm  p-4 h-full w-1/3 max-w-[250]">
      <div className="flex flex-col">
        {buttons.map(({ id, label }) => (
          <div key={id + label}>
            <ButtonTxt
              key={id}
              onClick={() => setActiveComponent(id)}
              className={
                activeComponent === id
                  ? "w-full bg-blue-500 text-white"
                  : "w-full text-gray-700 hover:bg-gray-200"
              }
            >
              {label}
            </ButtonTxt>
          </div>
        ))}
      </div>
      <button className="px-2 py-4  text-left text-sm font-medium rounded-md transition-colors duration-200 text-gray-700">
        Тех поддержка
      </button>
    </div>
  );
};

const MainCardInfo = ({ children }) => {
  return (
    <div className=" bg-white rounded-lg shadow-sm w-3/3 p-5 flex flex-col gap-2.5">
      {children}
    </div>
  );
};

const ContentHistory = () => {
  return <MainCardInfo>{"Моя история"}</MainCardInfo>;
};

const ContentMyCollection = () => {
  return <MainCardInfo>{"Моя коллекция"}</MainCardInfo>;
};

const ContentInfoUser = () => {
  return (
    <MainCardInfo>
      <div className="flex gap-4 w-full">
        <div className=" bg-black h-32 w-32 rounded-full"></div>
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Эдвин Пфейфер</h1>
            <p className="text-gray-600">Библиотекарь</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2.5">
        <CustomInput title="Почта" type="email" value="myMail@mail.ru" />
        <CustomInput title="ВУЗ" type="text" value="ОмГТУ" />
        <CustomInput title="Дата регистрация" type="date" value="15.05.2025" />
        <CustomInput
          title="Читательский билет"
          type="number"
          value="321321312"
        />
      </div>
    </MainCardInfo>
  );
};

//Работа с заявками
const SubContentClient = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <CustomInput title={"Поиск"} className=" w-[600px]"></CustomInput>
        <CustomInput title={"Статус"} className="w-full"></CustomInput>
      </div>
      <div className="flex flex-row gap-1">
        <button>отклонить</button>
        <button>принять</button>{" "}
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
                Статус
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
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                1
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                Александров Николай
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Подтвержден
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Студент
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                10.04.2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Alexandron.Nikolai@mail.ru
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                1
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                Кеавеахеулуокалани Камехамехаокалани Лланаафрпуллуингиллгог...
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                  Отклонен
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Студент
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                10.04.2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Alexandron.Nikolai@mail.ru
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                1
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                Константинопольский Александр Владимирович
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Ожидает
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Студент
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                10.04.2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Alexandron.Nikolai@mail.ru
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SubContentBook = () => {};

const ContentApplications = () => {
  const buttons = [
    { id: "clients", label: "Пользователи" },
    { id: "books", label: "Книги" },
  ];
  const subScreen = {
    clients: SubContentClient(),
    books: <div>Книги</div>,
  };
  const [activeComponent, setActiveComponent] = useState(buttons[0].id);

  return (
    <MainCardInfo>
      <h2 className="text-gray-700 font-bold text-2xl">Заявки</h2>
      <div className="flex flex-row gap-1">
        {buttons.map(({ id, label }) => {
          return (
            <ButtonTxt
              key={id}
              onClick={() => setActiveComponent(id)}
              className={
                activeComponent === id
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }
            >
              {label}
            </ButtonTxt>
          );
        })}
      </div>
      {subScreen[activeComponent]}
    </MainCardInfo>
  );
};

const UserDashboard = () => {
  const breadcrumbPath = [
    { label: "Главная", href: "/" },
    { label: "Профиль", href: `/profile` },
  ];

  const componentsScreen = {
    profile: ContentApplications(), //ContentInfoUser(),
    history: ContentHistory(),
    myCollection: ContentMyCollection(),
  };
  const [activeComponent, setActiveComponent] = useState(
    buttonsForReaders.at(0).id
  );

  return (
    <>
      <div className="flex flex-col mt-28">
        <div className="mx-auto  max-w-8/10 max-h-[80%] h-[80vh] flex flex-col items-centers">
          <Breadcrumbs path={breadcrumbPath} />
          <div className="flex gap-4 mt-4 h-full">
            <Sidebar
              buttons={buttonsForReaders}
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            />
            {componentsScreen[activeComponent]}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

/*
 {/* User Profile Header }
 <div className=" bg-grey-800 rounded-lg">
 <div className="mb-6">
   <h1 className="text-2xl font-bold">Эдвин Пфейфер</h1>
   <p className="text-gray-600">Библиотекарь</p>
 </div>
</div>
{/* Search Section }
<div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between">
   <div className="mb-4 md:mb-0">
     <h2 className="font-bold text-lg">Пользователи</h2>
     <p className="text-gray-600 text-sm">Поиск по ФИО, группе и номеру договора</p>
   </div>
   <div>
     <h2 className="font-bold text-lg">Книги</h2>
   </div>
 </div>
</div>

{/* Users Table }
<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
 <table className="min-w-full divide-y divide-gray-200">
   <thead className="bg-gray-50">
     <tr>
       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ФИО</th>
       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Регистрация</th>
       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Почта</th>
     </tr>
   </thead>
   <tbody className="bg-white divide-y divide-gray-200">
     <tr>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
       <td className="px-6 py-4 text-sm text-gray-900">
         Александров Николай
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm">
         <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
           Подтвержден
         </span>
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Студент</td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10.04.2025</td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alexandron.Nikolai@mail.ru</td>
     </tr>
     <tr>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
       <td className="px-6 py-4 text-sm text-gray-900">
         Кеавеахеулуокалани Камехамехаокалани Лланаафрпуллуингиллгог...
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm">
         <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
           Отклонен
         </span>
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Студент</td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10.04.2025</td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alexandron.Nikolai@mail.ru</td>
     </tr>
     <tr>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
       <td className="px-6 py-4 text-sm text-gray-900">
         Константинопольский Александр Владимирович
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm">
         <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
           Ожидает
         </span>
       </td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Студент</td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10.04.2025</td>
       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alexandron.Nikolai@mail.ru</td>
     </tr>
   </tbody>
 </table>
</div>
*/
