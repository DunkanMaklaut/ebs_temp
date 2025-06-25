"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ButtonTxt } from "./components/ButtonTxt";
import { SupportPopup } from "./components/SupportPopup";
import { getRoleText } from "./page";

export const Sidebar = ({ buttons, activeComponent, setActiveComponent }) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const roleTxt = getRoleText(user);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-sm  p-4 h-full w-1/3 min-h-[600px] max-w-[250]">
      <div className="flex flex-col">
        <label className=" font-bold m-5">Кабинет {roleTxt}</label>
        {buttons.map(({ id, label }) => (
          <ButtonTxt
            key={id}
            onClick={() => setActiveComponent(id)}
            className={
              activeComponent === id
                ? "w-full bg-blue-500 text-white"
                : "w-full text-gray-700 hover:bg-gray-200"
            }
          >
            {label}
          </ButtonTxt>
        ))}
      </div>
      <div className="flex flex-col">
        <button
          key="support"
          className="px-2 py-4  text-left text-sm font-medium rounded-md transition-colors duration-200 text-gray-700"
          onClick={() => setIsOpen(true)}
        >
          Тех поддержка
        </button>
        <SupportPopup isOpen={isOpen} setIsOpen={setIsOpen} />
        <button
          key="exit"
          className="px-2 py-4  text-left text-sm font-medium rounded-md transition-colors duration-200 text-gray-700"
          onClick={async () => {
            const response = await fetch("/api/auth/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            router.push("/login");
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};
