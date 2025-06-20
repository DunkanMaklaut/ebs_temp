"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookCard from "@components/book-card/bookCard.jsx";
import BookTabs from "@components/book-tabs/bookTabs.jsx";
import Header from "@components/header/Header.js";
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs.jsx";
import { applyTheme } from "@/app/themeUtils.js";
import { lightTheme } from "@resources/colors/colors.js";
import API_BASE_URL from "@/config";
import "./bookPage.css";

const BookPage = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [similarBooks, setSimilarBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReviewExists, setUserReviewExists] = useState(false);

  const currentUserId = 1; // Временно

  const router = useRouter();

  const handleReaderClick = (bookId) => {
    router.push(`/reader/${bookId}`);
  };

  useEffect(() => {
    applyTheme(lightTheme);
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/api/book/${id}`)
      .then((res) => res.json())
      .then(setBook)
      .catch((err) => console.error("Ошибка при загрузке книги:", err));

    fetch(`${API_BASE_URL}/api/book/getSimilarById/${id}/10`)
      .then((res) => res.json())
      .then((data) => {
        const formattedBooks = data.map((book) => ({
          id: book.id,
          title: book.name,
          subtitle: book.authors.map((a) => a.fullName).join(", "),
          cover: book.coverSheet
            ? `data:image/jpeg;base64,${book.coverSheet}`
            : "/images/emptycover.png",
        }));
        setSimilarBooks(formattedBooks);
      })
      .catch((err) => console.error("Ошибка при загрузке похожих книг:", err));
  }, [id]);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/api/review/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        const alreadyReviewed = data.some((r) => r.userId === currentUserId);
        setUserReviewExists(alreadyReviewed);
      })
      .catch((err) => console.error("Ошибка при загрузке отзывов:", err));
  }, [id]);

  if (!book) return <div>Загрузка...</div>;

  const breadcrumbPath = [
    { label: "Главная", href: "/" },
    { label: book.discipline.name, href: `/collection/${book.discipline.id}` },
    { label: book.name, href: null },
  ];

  return (
    <div className="bookScreen">
      <div className="bookScreen-container">
        <Breadcrumbs path={breadcrumbPath} />
        <BookCard
          book={book}
          setActiveTab={setActiveTab}
          reviewCount={reviews.length}
          onReaderClick={handleReaderClick}
        />
        <BookTabs
          book={book}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          similarBooks={similarBooks}
          reviews={reviews}
          userReviewExists={userReviewExists}
        />
      </div>
    </div>
  );
};

export default BookPage;
