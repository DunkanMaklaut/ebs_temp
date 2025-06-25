"use client";
import React from "react";
import { BookViewCatalog } from "./components/cardBook";
import { CustomInput } from "./components/CustomInput";
import { MainCardInfo } from "./components/MainCardInfo";

export const BookCatalog = () => {
  const books = [
    { title: "Книга1", author: "Пелевин Виктор", catalog: "ожидает" },
    { title: "Книга4", author: "Пелевин Виктор", catalog: "ожидает" },
    { title: "Книга4", author: "Пелевин Виктор", catalog: "ожидает" },
    { title: "Книга4", author: "Пелевин Виктор", catalog: "ожидает" },
  ];
  return (
    <MainCardInfo>
      <h2 className="text-gray-700 font-bold text-4xl">Каталог книг</h2>
      <div className="flex  w-fill gap-4">
        <CustomInput title={"Поиск"} classNameAllBlock="w-[60%]" />
        <CustomInput
          title={"Каталог"}
          value={"Наука"}
          classNameAllBlock="w-[30%]"
        />
      </div>
      <div className="flex flex-col   p-6 bg-white rounded-lg shadow-md border border-[#F0F0F0]">
        <label className="text-2xl pb-2 font-bold text-gray-700">Наука</label>
        <div className="flex flex-wrap min-w-[200px] ">
          {books.map(({ title, author, status }, index) => {
            return (
              <BookViewCatalog
                key={"cat" + title + index}
                id={"cat" + title + index}
                title={title}
                author={author}
                onClick={() => {
                  console.log("click" + title);
                }}
              />
            );
          })}
        </div>
      </div>
    </MainCardInfo>
  );
};
