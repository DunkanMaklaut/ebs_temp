"use client";
import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiUser } from "react-icons/hi";
import { FaTh, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import API_BASE_URL from "@/config";
import { applyTheme } from "../../app/themeUtils";
import { lightTheme } from "@resources/colors/colors.js";

const Header = () => {
  useEffect(() => {
    applyTheme(lightTheme);
  }, []);

  const isLoggedIn = false;
  const router = useRouter();
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/discipline/all`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Ошибка при загрузке дисциплин:", error);
        setError("Не удалось загрузить список жанров");
        toast.error("Ошибка загрузки жанров");
      } finally {
        setLoading(false);
      }
    };

    if (showGenresModal) {
      fetchGenres();
    }
  }, [API_BASE_URL, showGenresModal]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const limit = 5;
        const response = await fetch(
          `${API_BASE_URL}/api/Search/small/${encodeURIComponent(
            searchQuery
          )}/${limit}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Ошибка при получении подсказок:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const delayFetch = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayFetch);
  }, [searchQuery, API_BASE_URL]);

  const handleClick = () => {
    router.push("/register");
  };

  const handleGenresClick = () => {
    setShowGenresModal(!showGenresModal);
  };

  const handleGenreSelect = (genreId) => {
    router.push(`/collection/${genreId}`);
    setShowGenresModal(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
    setShowSuggestions(false);
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSuggestionClick = (suggestion) => {
    router.push(`/search/${encodeURIComponent(suggestion.suggestion)}`);
    setShowSuggestions(false);
    setSearchQuery(suggestion.suggestion);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <header className="header">
          <div
            className="header-logo"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            <Image
              src="/images/LogoEbs.svg"
              alt="EBS Logo"
              className="logo-img"
              width={50}
              height={50}
            />
            <div className="site-name">
              <span className="site-name-main">ТехТОМ</span>
              <span className="site-name-sub">
                Электронно-
                <br />
                библиотечная система
              </span>
            </div>
          </div>

          <button onClick={handleGenresClick} className="genres-button">
            <FaTh className="genres-icon" />
            <span>Все жанры</span>
          </button>

          <div className="header-search-container">
            <form onSubmit={handleSearch} className="header-search">
              <input
                type="text"
                placeholder="Поиск по названию и артикулу"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={handleInputBlur}
                ref={inputRef}
              />
              <button className="search-button">Найти</button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="header-actions">
            {isLoggedIn ? (
              <>
                <button type="button" className="profile-button">
                  <HiUser className="profile-icon" />
                  <span className="profile-text">Профиль</span>
                </button>
                <button type="button" className="profile-button">
                  <div className="profile-icon"></div>
                  <span className="profile-text">Коллекции</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleClick}
                type="button"
                className="profile-button"
              >
                <HiUser className="profile-icon" />
                <span className="profile-text">Войти</span>
              </button>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
