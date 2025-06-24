"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CollectionList from "@components/collectionList/CollectionList.jsx";
import CookieConsent from "@components/cookie-consent/cookieConsent.js";
import { applyTheme } from "@/app/themeUtils.js";
import { lightTheme } from "@resources/colors/colors.js";
import API_BASE_URL from "@/config";

const Page = function () {
  const [collections, setCollections] = useState([]);

  const [genres, setGenres] = useState([]);

  const router = useRouter();

  const handleMoreDetails = (collectionId) => {
    router.push(`/collection/${collectionId}`);
  };

  const handleBookClick = (bookId) => {
    router.push(`/book/${bookId}`);
  };

  useEffect(() => {
    applyTheme(lightTheme);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/discipline/all`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data);
      })
      .catch((error) => console.error("Ошибка при загрузке дисциплин:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/discipline/all`)
      .then((response) => response.json())
      .then((disciplines) => {
        const fetchBooksPromises = disciplines.map((discipline) =>
          fetch(
            `${API_BASE_URL}/api/book/getSmallByDiscipline/${discipline.id}/5/0`
          )
            .then((response) => response.json())
            .then((books) => ({
              id: discipline.id,
              name: discipline.name,
              books: books.map((book) => ({
                id: book.id,
                title: book.name,
                subtitle: book.authors
                  .map((author) => author.fullName)
                  .join(", "),
                cover: book.coverSheet
                  ? `data:image/jpeg;base64,${book.coverSheet}`
                  : "/images/emtycover.png",
              })),
            }))
        );

        Promise.all(fetchBooksPromises).then(setCollections);
      })
      .catch((error) => console.error("Ошибка при загрузке данных:", error));
  }, []);

  return (
    <div className="bg-primary-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Block */}
        <div className="w-full mt-28 rounded-3xl overflow-hidden">
          <Image
            src="/images/welcomeBlock.png"
            alt="Welcome Block"
            className="w-full h-auto object-cover rounded-3xl"
            width={1920}
            height={400}
          />
        </div>

        {/* Genres */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="bg-white px-4 py-2 rounded-xl text-sm cursor-pointer flex items-center justify-center truncate text-center"
              onClick={() => router.push(`/collection/${genre.id}`)}
            >
              {genre.name}
            </div>
          ))}
        </div>

        {/* Collections */}
        <div className="mt-8 space-y-8">
          {collections
            .filter((collection) => collection.books.length > 0)
            .map((collection) => (
              <CollectionList
                key={collection.id}
                collectionId={collection.id}
                collectionName={collection.name}
                collectionDescription={`Книги по дисциплине ${collection.name}`}
                books={collection.books}
                onMoreDetails={handleMoreDetails}
                hideMoreDetails={false}
                onBookClick={handleBookClick}
                
              />
            ))}
        </div>
      </div>
      <CookieConsent />
    </div>
  );
};

export default Page;
