"use client";
import React, { useEffect, useState } from "react";
import BookCard from "./components/cardBook";
import { MainCardInfo } from "./components/MainCardInfo";
import API_BASE_URL from "@/config";
export const ContentHistory = () => {
  const [books, setBooks] = useState([
    /* {
      title: "Книга1",
      author: "Пелевин Виктор",
      status: "Просмотрен сегодня в 17:30",
    },
    {
      title: "Типо длинное название...",
      author: "Пелевин Виктор",
      status: "Просмотрен сегодня в 15:30",
    },
    {
      title: "Книга3",
      author: "Пелевин Виктор",
      status: "Просмотрен 14.05.2025",
    },
    {
      title: "Книга4",
      author: "Пелевин Виктор",
      status: "Просмотрен 14.05.2025",
    },
    {
      title: "Книга5",
      author: "Пелевин Виктор",
      status: "Просмотрен 14.05.2025",
    },
    {
      title: "Книга6",
      author: "Пелевин Виктор",
      status: "Просмотрен 14.05.2025",
    },*/
  ]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/book/getSmallByDiscipline/2/5/0`
        );
        const booksData = await response.json();

        // Проверяем, что booksData - массив
        if (!Array.isArray(booksData)) {
          throw new Error("API response is not an array");
        }

        const updatedBooks = booksData.map((book, index) => ({
          title: book.name || `Книга${index + 1}`,
          author:
            book.authors?.map((author) => author.fullName).join(", ") ||
            "Пелевин Виктор",
          status: books[index]?.status || "Просмотрен сегодня в 00:00",
          cover: book.coverSheet
            ? `data:image/jpeg;base64,${book.coverSheet}`
            : "/images/emptycover.png",
        }));

        setBooks(updatedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    return;
    fetchBooks();
  });

  return (
    <MainCardInfo>
      <h2 className="text-gray-700 font-bold text-4xl">История</h2>
      <div className="p-6">
        <div className="flex flex-wrap min-w-[200px]">
          {books.map((book) => (
            <BookCard
              key={book.title + "history"}
              imgPath={book.cover}
              id={book.title}
              title={book.title}
              author={book.author}
              status={book.status}
            />
          ))}
        </div>
      </div>
    </MainCardInfo>
  );
};
