"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CollectionList from "@components/collectionList/CollectionList.jsx";
import { applyTheme } from "@/app/themeUtils.js";
import { lightTheme } from "@resources/colors/colors.js";
import Header from "@components/header/Header.js";
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs.jsx";
import "./collection.css";
import API_BASE_URL from "@/config";

const CollectionPage = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    applyTheme(lightTheme);
  }, []);

  const router = useRouter();

  const handleBookClick = (bookId) => {
    router.push(`/book/${bookId}`);
  };

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/api/discipline/${id}`)
      .then((response) => response.json())
      .then((discipline) => {
        fetch(
          `${API_BASE_URL}/api/book/getSmallByDiscipline/${discipline.id}/100/0`
        )
          .then((response) => response.json())
          .then((books) => {
            setCollection({
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
                  : "public/images/emptycover.png",
              })),
            });
          });
      })
      .catch((error) => console.error("Ошибка при загрузке коллекции:", error));
  }, [id]);

  if (!collection) return <div>Загрузка...</div>;

  const breadcrumbPath = [
    { label: "Главная", href: "/" },
    { label: collection.name, href: null },
  ];

  return (
    <div className="collectionScreen">
      <div className="collectionScreen-container">
        <Breadcrumbs path={breadcrumbPath} />
        <CollectionList
          collectionName={collection.name}
          collectionId={collection.id}
          collectionDescription={`Все книги по дисциплине ${collection.name}`}
          books={collection.books}
          hideMoreDetails
          onBookClick={handleBookClick}
          onMoreDetails={() => {}}
        />
      </div>
    </div>
  );
};

export default CollectionPage;
