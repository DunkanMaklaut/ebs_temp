"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiUser, HiOutlineSearch } from "react-icons/hi";
import { FaTh } from "react-icons/fa";
import { toast } from "react-hot-toast";
import API_BASE_URL from "@/config";
import { applyTheme } from "@/app/themeUtils";
import { lightTheme } from "@resources/colors/colors.js";

const getTokenFromCookie = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  return match ? match[2] : null;
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    applyTheme(lightTheme);
  }, []);

  const router = useRouter();
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const token = getTokenFromCookie();
    setIsLoggedIn(!!token);

    const fetchGenres = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/discipline/all`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        toast.error("Ошибка загрузки жанров");
      }
    };

    if (showGenresModal) fetchGenres();
  }, [showGenresModal]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/Search/small/${encodeURIComponent(searchQuery)}/5`
        );
        if (!response.ok) throw new Error("Ошибка при получении подсказок");
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
    setShowSuggestions(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md rounded-b-2xl">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2 flex-nowrap">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer flex-shrink-0 w-auto"
          onClick={() => router.push("/")}
        >
          <Image src="/images/LogoEbs.svg" alt="EBS Logo" width={50} height={50} />
          <div className="ml-2 text-sm leading-tight hidden sm:block">
            <div className="font-bold text-lg text-gray-800">ТехТОМ</div>
            <div className="text-xs text-gray-500">
              Электронно-<br /> библиотечная система
            </div>
          </div>
        </div>

        {/* Genres Button */}
        <button
          onClick={() => setShowGenresModal(!showGenresModal)}
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          <FaTh className="sm:mr-2" />
          <span className="hidden sm:inline">Все жанры</span>
        </button>

        {/* Search */}
        <div className="relative flex-grow min-w-0 max-w-4xl mx-2">
          <form
            onSubmit={handleSearch}
            className={`flex rounded-lg overflow-hidden w-full border-2 ${
              "border-blue-500"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Поиск по названию и артикулу"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="flex-grow px-4 py-2 bg-white outline-none text-sm min-w-0"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 text-sm hover:bg-blue-500 cursor-pointer flex-shrink-0 flex items-center justify-center"
            >
              <span className="hidden sm:block">Найти</span>
              <HiOutlineSearch className="sm:hidden text-lg" />
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 w-full text-sm max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    router.push(`/search/${encodeURIComponent(item.suggestion)}`);
                    setSearchQuery(item.suggestion);
                    setShowSuggestions(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right-side buttons */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {isLoggedIn ? (
            <>
              <button 
              onClick={() => router.push("/profile")}
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-sm">
                <HiUser className="text-xl" />
                <span className="hidden sm:inline">Профиль</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/register")}
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-sm"
            >
              <HiUser className="text-xl" />
              <span className="hidden sm:inline">Войти</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
