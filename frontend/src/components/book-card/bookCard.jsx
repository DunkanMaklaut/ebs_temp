import React from "react";
import { IconRead, IconShare, IconFavorite, IconAddCollection } from "@components/icons";
import RatingBook from "@components/rating/ratingBook";

import { lightTheme as colors } from "@resources/colors/colors";

const BookCard = ({ book, setActiveTab, reviewCount, onReaderClick }) => {
  const cover = book.coverSheet
    ? `data:image/jpeg;base64,${book.coverSheet}`
    : "/images/emptycover.jpg";

  const getReviewLabel = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) return "отзыв";
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "отзыва";
    return "отзывов";
  };

  return (
    <div
       className="w-full mb-1 flex flex-col lg:flex-row gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[32px] p-6 sm:p-8"
      style={{ backgroundColor: colors.secondaryBackground }}
    >
      {/* Обложка */}
      <div
        className="w-full sm:w-[243px]  border rounded-[24px] overflow-hidden flex-shrink-0"
        style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <img
          src={cover}
          alt="Обложка книги"
          className="w-full h-full object-cover rounded-lg border border-gray-300"
        />
      </div>

      {/* Контент */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Заголовок и действия */}
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Заголовок */}
          <div className="flex-1">
            <h2
              className="text-[24px] leading-[29px] font-medium mb-2 "
              style={{ color: colors.primaryText }}
              title={book.name} // Чтобы при обрезке показывать полный текст при наведении
            >
              {book.name}
            </h2>
            <div
              className="flex flex-col sm:flex-row sm:flex-wrap gap-1 text-[15px]"
              style={{ color: colors.primaryText }}
            >
              {/* Первый параметр: рейтинг */}
              <div className="flex items-center gap-2 whitespace-nowrap">
                <RatingBook rating={book.rating || 0} />
              </div>

              {/* Разделитель — точка */}
              <div className="hidden sm:flex items-center">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: colors.primaryText }}
                />
              </div>

              {/* Второй параметр: отзывы */}
              <div className="whitespace-nowrap font-medium">
                {reviewCount} {getReviewLabel(reviewCount)}
              </div>

              {/* Разделитель — точка */}
              <div className="hidden sm:flex items-center">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: colors.primaryText }}
                />
              </div>

              {/* Третий параметр: ISBN */}
              <div className="whitespace-nowrap" style={{ color: colors.secondaryText }}>
                ISBN: <strong>{book.isbn}</strong>
              </div>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col gap-2 min-w-[120px]">
            <button
              onClick={() => onReaderClick(book.id)}
              className="flex items-center justify-center gap-2 px-4 py-3 h-12 text-sm rounded-[14px] hover:opacity-90 transition"
              style={{
                backgroundColor: colors.primaryButton,
                color: colors.primaryButtonText,
              }}
            >
              <IconRead size="20" color="#FFFFFF"/>
              Читать
            </button>
            <div className="flex flex-wrap gap-2 w-full">
              <button
                className="p-3 h-12 flex-grow min-w-[48px] sm:flex-grow-0 sm:w-12 rounded-[14px] hover:bg-gray-100 transition flex items-center justify-center"

                style={{ backgroundColor: colors.primaryBackground }}
              >
                <IconFavorite size="20" color={colors.secondaryText} />
              </button>
              <button
                className="p-3 h-12 flex-grow min-w-[48px] sm:flex-grow-0 sm:w-12 rounded-[14px] hover:bg-gray-100 transition flex items-center justify-center"
                style={{ backgroundColor: colors.primaryBackground }}
              >
                <IconAddCollection size="20" color={colors.secondaryText} />
              </button>
              <button
                className="p-3 h-12 flex-grow min-w-[48px] sm:flex-grow-0 sm:w-12 rounded-[14px] hover:bg-gray-100 transition flex items-center justify-center"

                style={{ backgroundColor: colors.primaryBackground }}
              >
                <IconShare size="20" color={colors.secondaryText} />
              </button>
            </div>
          </div>
        </div>

        {/* Детали */}
        <div
          className="rounded-[24px] p-6 flex flex-col gap-4"
          style={{ backgroundColor: colors.primaryBackground }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.primaryText }}
            >
              О книге
            </h3>
            <button
              onClick={() => setActiveTab("about")}
              className="text-sm hover:underline"
              style={{ color: colors.primaryButton }}
            >
              Подробнее
            </button>
          </div>

          <div
  className="grid grid-cols-1 sm:grid-cols-1 gap-4 text-sm"
  style={{ color: colors.secondaryText }}
>
  <div className="flex">
    <span className="w-28 font-medium" style={{ color: colors.secondaryText }}>
      Автор:
    </span>
    <div className="flex flex-wrap gap-2 flex-1">
      {book.authors.map((a, i) => (
        <span key={i}>{a.fullName}</span>
      ))}
    </div>
  </div>
  <div className="flex">
    <span className="w-28 font-medium" style={{ color: colors.secondaryText }}>
      Издательство:
    </span>
    <span className="flex-1">{book.publisher.name}</span>
  </div>
  <div className="flex">
    <span className="w-28 font-medium" style={{ color: colors.secondaryText }}>
      Год:
    </span>
    <span className="flex-1">{book.year}</span>
  </div>
  <div className="flex">
    <span className="w-28 font-medium" style={{ color: colors.secondaryText }}>
      Страниц:
    </span>
    <span className="flex-1">{book.pages}</span>
  </div>
  <div className="flex">
    <span className="w-28 font-medium" style={{ color: colors.secondaryText }}>
      Тип издания:
    </span>
    <span className="flex-1">{book.pubType}</span>
  </div>
  <div className="flex">
    <span className="w-28 font-medium" style={{ color: colors.secondaryText }}>
      Каталог:
    </span>
    <span
      className=" px-2 py-1 rounded-full"
      style={{ backgroundColor: colors.secondaryBackground, color: colors.primaryText }}
    >
      {book.discipline.name}
    </span>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default BookCard;
