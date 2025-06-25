"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[90%] sm:w-[400px] bg-white shadow-lg rounded-xl p-4 text-sm">
      <h2 className="font-semibold mb-2">Использование cookie</h2>
      <p className="text-gray-700 mb-3">
        Мы используем cookie для обеспечения наилучшего опыта работы с сайтом. Продолжая пользоваться сайтом, вы соглашаетесь с их использованием.
      </p>
      <div className="flex justify-between items-center gap-3">
        <Link
          href="/privacy-policy"
          className="text-blue-600 hover:underline whitespace-nowrap"
        >
          Подробнее
        </Link>
        <button
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Согласен
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
