"use client";

import React, { useEffect, useState } from "react";

import Header from "@components/header/Header";
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs";
import { lightTheme } from "@resources/colors/colors.js";
import { BookViewCatalog } from "@/app/(mainPages)/profile/components/cardBook";
import { title } from "process";
import { ButtonTxt } from "@/app/(mainPages)/profile/components/ButtonTxt";
import { MainCardInfo } from "@/app/(mainPages)/profile/components/MainCardInfo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import SubContentBook from "@/app/(mainPages)/profile/subContentScreen/SubContentBook";
import { ContentHistory } from "@/app/(mainPages)/profile/ContentHistory";
import PersonalAccountReader from "@/app/(mainPages)/profile/personalAccountReader";
import PersonalAccountStaff from "@/app/(mainPages)/profile/personalAccountStaff";
import API_BASE_URL from "@/config";
import { ReportsAndStatistics } from "@/app/(mainPages)/profile/ReportsAndStatistics";
import { ReportsAndStatisticsPublisher } from "@/app/(mainPages)/profile/ReportsAndStatisticsPublisher";
import { UserManagement } from "@/app/(mainPages)/profile/UserManagement";
import { BookCatalog } from "@/app/(mainPages)/profile/BookCatalog";
import { Sidebar } from "@/app/(mainPages)/profile/Sidebar";
import { SubContentClient } from "@/app/(mainPages)/profile/subContentScreen/SubContentClient";
import Image from "next/image";
// Безопасное получение роли с проверкой на undefined/null
export const getRoleText = (user) => {
  if (!user) return "Не авторизован";
  console.log(user.role);
  switch (user.role) {
    case "READER":
      return "Читатель";
    case "LIBRARIAN":
      return "Библиотекарь";
    default:
      return "Издатель"; // или "Неизвестная роль"
  }
};
const buttonsForLibrarian = [
  { id: "profile", label: "Личная информация" },
  { id: "applications", label: "Заявки" },
  { id: "bookCatalog", label: "Каталог книг" },
  { id: "userManagement", label: "Управление пользователями" },
  { id: "reportsAndStatistics", label: "Отчёты и статистика" },
];

const buttonsForPublisher = [
  { id: "profile", label: "Личная информация" },
  { id: "applications", label: "Заявки" },
  { id: "bookCatalog", label: "Каталог книг" },
  { id: "reportsAndStatistics", label: "Отчёты и статистика" },
];
const buttonsForReaders = [
  { id: "profile", label: "Личная информация" },
  { id: "history", label: "История" },
  { id: "myCollection", label: "Мои подборки" },
];

const ThreeImageComponent = ({ images }) => {
  if (!images || images.length === 0) return "Загрузка";
  return (
    <div className="w-128 h-64 flex gap-2">
      {/* Левая часть (50% ширины, 100% высоты) */}
      <div className="w-[70%] h-full overflow-hidden rounded-lg">
        <Image
          src={images[0]?.cover || "/default-image.jpg"}
          width={70}
          height={64}
          alt="Левое изображение"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Правая часть (50% ширины, 100% высоты) */}
      <div className="w-[30%] h-full flex flex-col gap-2">
        {/* Верхнее правое изображение (50% ширины, 50% высоты) */}
        <div className="h-1/2 overflow-hidden rounded-lg">
          <Image
            width={70}
            height={64}
            src={images[1]?.cover || "/default-image.jpg"}
            alt="Верхнее правое изображение"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Нижнее правое изображение (50% ширины, 50% высоты) */}
        <div className="h-1/2 overflow-hidden rounded-lg">
          <Image
            width={70}
            height={64}
            src={images[2]?.cover || "/images/KOn.png"}
            alt="Нижнее правое изображение"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const CollectionsGrid = ({ collections = [] }) => {
  console.log(collections);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
        >
          {/* Изображения книг */}
          <div className="flex flex-wrap gap-2 mb-2">
            <ThreeImageComponent
              images={collection.booksCollection.slice(0, 3)}
            />
          </div>
          {/* Название и описание */}
          <div>
            <h3 className="text-lg font-semibold">{collection.title}</h3>
            <p className="text-sm text-gray-500">
              {collection.booksCollection.length} книг
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContentMyCollection = () => {
  const [myCollection, setMyCollection] = useState([
    /* {
      id: "favorites",
      title: "Избранное",
      booksCollection: [],
      isFavorites: true,
    },
    {
      id: "1",
      title: "Программирование",
      booksCollection: [],
      isFavorites: false,
    },
    {
      id: "2",
      title: "Наука",
      booksCollection: [],
      isFavorites: false,
    },*/
  ]);

  const [newCollectionName, setNewCollectionName] = useState("");

  // Функция загрузки книг по дисциплине
  const fetchBooks = async (id) => {
    return [];
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/book/getSmallByDiscipline/${id}/5/0`
      );
      const booksData = await response.json();

      if (!Array.isArray(booksData)) throw new Error("Неверный формат данных");

      return booksData.map((book, index) => ({
        id: book.id || `book-${id}-${index}`,
        title: book.name || `Книга ${index + 1}`,
        author:
          book.authors?.map((a) => a.fullName).join(", ") ||
          "Неизвестный автор",
        cover: book.coverSheet
          ? `data:image/jpeg;base64,${book.coverSheet}`
          : "/images/emptycover.jpg",
      }));
    } catch (error) {
      console.error("Ошибка при загрузке книг:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadCollections = async () => {
      const programmingBooks = await fetchBooks(2);
      const scienceBooks = await fetchBooks(4);
      return;
      setMyCollection([
        {
          id: "favorites",
          title: "Избранное",
          booksCollection: programmingBooks,
          isFavorites: true,
        },
        ,
        {
          id: 1,
          title: "Программирование",
          booksCollection: programmingBooks,
          isFavorites: false,
        },
        {
          id: 2,
          title: "Наука",
          isFavorites: false,
          booksCollection: scienceBooks,
        },
      ]);
    };

    loadCollections();
  }, []); // Пустой массив зависимостей для выполнения только при монтировании
  // Создание новой коллекции
  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;

    const newCollection = {
      id: Date.now().toString(),
      title: newCollectionName,
      booksCollection: [],
      isFavorites: false,
    };

    setMyCollection((prev) => [...prev, newCollection]);
    setNewCollectionName("");
  };
  // Добавление книги в коллекцию
  const addToCollection = (book, collectionId) => {
    setMyCollection((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              booksCollection: [
                book,
                ...collection.booksCollection.filter((b) => b.id !== book.id),
              ],
            }
          : collection
      )
    );
  };

  // Удаление книги из коллекции
  const removeFromCollection = (bookId, collectionId) => {
    setMyCollection((prev) =>
      prev.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              booksCollection: collection.booksCollection.filter(
                (book) => book.id !== bookId
              ),
            }
          : collection
      )
    );
  };

  return (
    <MainCardInfo>
      <h2 className="text-gray-700 font-bold text-4xl mb-6">Мои подборки</h2>

      {/* Блок пользовательских коллекций */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Введите название коллекции"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleCreateCollection}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Создать
          </button>
        </div>
        <CollectionsGrid
          collections={myCollection.filter((c) => !c.isFavorites)}
        />

        {/* Блок "Избранное" */}
        {myCollection
          .filter((c) => c.isFavorites)
          .map((collection) => (
            <div key={collection.id} className="mb-8">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-xl font-bold">{collection.title}</h3>
              </div>
              <div className="flex flex-wrap min-w-[200px] gap-4 mt-4">
                {collection.booksCollection.map((book) => (
                  <BookViewCatalog
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    imgPath={book.cover}
                    onClick={() => console.log("Просмотр", book)}
                    onAddToCollection={(e) => {
                      e.stopPropagation();
                      addToCollection(book, collection.id);
                    }}
                    onRemoveFromCollection={(e) => {
                      e.stopPropagation();
                      removeFromCollection(book.id, collection.id);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </MainCardInfo>
  );
};

const ContentApplications = () => {
  const { user, loading } = useAuth();

  // Начальное состояние - только "Книги"
  const [buttons, setButtons] = useState([{ id: "books", label: "Книги" }]);
  const [activeComponent, setActiveComponent] = useState("books"); // Начинаем с "books"

  // Обновляем кнопки при изменении user
  useEffect(() => {
    if (user?.role === "LIBRARIAN") {
      setButtons([
        { id: "clients", label: "Пользователи" },
        { id: "books", label: "Книги" },
      ]);
      setActiveComponent("clients");
    }
  }, [user]); // Зависимость от user

  const subScreen = {
    clients: <SubContentClient />,
    books: <SubContentBook />,
  };
  return (
    <MainCardInfo>
      <h2 className="text-gray-700 font-bold text-4xl">Заявки</h2>
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

const componentsScreenReader = {
  profile: <PersonalAccountReader />,
  history: <ContentHistory />,
  myCollection: <ContentMyCollection />,
};
const componentsScreenPublisher = {
  profile: <PersonalAccountStaff />,
  applications: <ContentApplications />,
  bookCatalog: <BookCatalog />,
  reportsAndStatistics: <ReportsAndStatisticsPublisher />,
};
const componentsScreenLibrarian = {
  profile: <PersonalAccountStaff />,
  applications: <ContentApplications />,
  bookCatalog: <BookCatalog />,
  userManagement: <UserManagement />,
  reportsAndStatistics: <ReportsAndStatistics />,
};

function checkUser(user) {
  if (!user) return { screen: {}, buttons: {} };

  switch (user.role) {
    case "READER":
      return { screens: componentsScreenReader, buttons: buttonsForReaders };
    case "LIBRARIAN":
      return {
        screens: componentsScreenLibrarian,
        buttons: buttonsForLibrarian,
      };
    default:
      return {
        screens: componentsScreenPublisher,
        buttons: buttonsForPublisher,
      }; // или "Неизвестная роль"
  }
}

const UserDashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const breadcrumbPath = [
    { label: "Главная", href: "/" },
    { label: "Профиль", href: `/profile` },
  ];
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);
  const profile = checkUser(user);
  const componentsScreen = componentsScreenLibrarian;
  const buttonsSidebar = buttonsForLibrarian;
  const [activeComponent, setActiveComponent] = useState("profile");

  if (loading || !user) return <div>Загрузка...</div>;

  return (
    <>
      <div className="flex flex-col mt-28 min-h-[calc(100vh-7rem)]">
        <div className="mx-auto w-full max-w-[70%] flex flex-col flex-grow items-centers">
          <Breadcrumbs path={breadcrumbPath} />
          <div className="flex gap-4 mt-4 h-full">
            <Sidebar
              buttons={profile.buttons}
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            />
            {profile.screens[activeComponent]}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
