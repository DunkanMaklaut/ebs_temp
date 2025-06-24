"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookCard from "@components/book-card/bookCard";
import BookTabs from "@components/book-tabs/bookTabs";
import Header from "@components/header/Header";
import Breadcrumbs from "@components/breadcrumbs/breadcrumbs";
import { applyTheme } from "@/app/themeUtils";
import { lightTheme } from "@resources/colors/colors";
import API_BASE_URL from "@/config";

const BookPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [similarBooks, setSimilarBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReviewExists, setUserReviewExists] = useState(false);

  const currentUserId = 1; // временный заглушка

  useEffect(() => {
    applyTheme(lightTheme);
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE_URL}/api/book/${id}`)
      .then((res) => res.json())
      .then(setBook)
      .catch(console.error);
    fetch(`${API_BASE_URL}/api/book/getSimilarById/${id}/10`)
      .then((res) => res.json())
      .then((data) => {
        setSimilarBooks(
          data.map((b) => ({
            id: b.id,
            title: b.name,
            subtitle: b.authors.map((a) => a.fullName).join(", "),
            cover: b.coverSheet
              ? `data:image/jpeg;base64,${b.coverSheet}`
              : "/images/emptycover.png",
          }))
        );
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE_URL}/api/review/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setUserReviewExists(data.some((r) => r.userId === currentUserId));
      })
      .catch(console.error);
  }, [id]);

  const handleReaderClick = (bookId) => {
    router.push(`/reader/${bookId}`);
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        Загрузка...
      </div>
    );
  }

  const breadcrumbPath = [
    { label: "Главная", href: "/" },
    { label: book.discipline.name, href: `/collection/${book.discipline.id}` },
    { label: book.name, href: null },
  ];

  return (
    <div className="min-h-screen bg-primary-background">
      <div className="max-w-screen-xl mx-auto pt-28 px-3 sm:px-4 lg:px-8 flex flex-col items-stretch space-y-8">
        <Breadcrumbs path={breadcrumbPath} />
        <BookCard
          book={book}
          setActiveTab={setActiveTab}
          reviewCount={reviews.length}
          onReaderClick={handleReaderClick}
          colors={lightTheme}
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
