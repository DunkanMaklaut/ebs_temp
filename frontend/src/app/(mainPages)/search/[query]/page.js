"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CollectionList from "@components/collectionList/CollectionList.jsx";
import { applyTheme } from "@/app/themeUtils.js";
import { lightTheme } from "@resources/colors/colors.js";
import Header from "@components/header/Header.js";
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs.jsx";
import "./searchPage.css";
import API_BASE_URL from "@/config";

const SearchPage = () => {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    applyTheme(lightTheme);
  }, []);

  const handleBookClick = (bookId) => {
    router.push(`/book/${bookId}`);
  };

  useEffect(() => {
    if (!decodedQuery) {
      setIsLoading(false);
      setSearchResults({
        id: "search",
        name: `Результаты поиска: "${decodedQuery}"`,
        books: [],
      });
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/Search/full/${encodeURIComponent(decodedQuery)}`
        );
        if (!response.ok)
          throw new Error(`Search failed with status ${response.status}`);
        const data = await response.json();

        const books = (data.books || []).map((book) => ({
          id: book.id,
          title: book.name,
          subtitle:
            book.authors?.map((author) => author.fullName).join(", ") ||
            "Автор не указан",
          cover: book.coverSheet
            ? `data:image/jpeg;base64,${book.coverSheet}`
            : "/images/emptycover.png",
        }));

        setSearchResults({
          id: "search",
          name: `Результаты поиска: "${decodedQuery}"`,
          books,
        });
      } catch (error) {
        console.error("Ошибка при поиске:", error);
        setSearchResults({
          id: "search",
          name: `Результаты поиска: "${decodedQuery}"`,
          books: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchSearchResults();
  }, [decodedQuery]);

  const breadcrumbPath = [
    { label: "Главная", href: "/" },
    { label: `Результаты поиска: "${decodedQuery}"`, href: null },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mt-28">
        <Breadcrumbs path={breadcrumbPath} />
        {isLoading ? (
          <div className="search-loading">Загрузка...</div>
        ) : !decodedQuery ? (
          <div className="search-message">Введите поисковый запрос</div>
        ) : (
          <CollectionList
            collectionName={`Результаты поиска: "${decodedQuery}"`}
            collectionId="search"
            collectionDescription={
              searchResults.books.length
                ? `Найдено ${searchResults.books.length} книг по запросу "${decodedQuery}"`
                : `Ничего не найдено по запросу "${decodedQuery}"`
            }
            books={searchResults.books}
            hideMoreDetails={true}
            onMoreDetails={() => {}}
            onBookClick={handleBookClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
