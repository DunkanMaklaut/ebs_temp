import React from 'react';

const AboutBookTab = ({ book }) => {
  // Зададим ширину левой колонки 120px
  const leftColWidth = 120;

  return (
    <div className="flex flex-col gap-3 max-w-full">
      <h3 className="text-xl font-bold mb-4">Основные сведения</h3>
      
      {/* Автор */}
      {book.authors && book.authors.length > 0 && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ minWidth: `${leftColWidth}px` }}
          >
            Автор
          </span>
          <span
            className="flex flex-wrap gap-2 text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }} // 16px — маргин справа
          >
            {book.authors.map((a, index) => (
              <span key={index} className="relative">
                {a.fullName}
                {index < book.authors.length - 1 && (
                  <span className="ml-2 text-gray-700 align-middle">·</span>
                )}
              </span>
            ))}
          </span>
        </div>
      )}

      {/* Издательство */}
      {book.publisher && book.publisher.name && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ minWidth: `${leftColWidth}px` }}
          >
            Издательство
          </span>
          <span
            className="text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }}
          >
            {book.publisher.name}
          </span>
        </div>
      )}

      {/* Год */}
      {book.year && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ minWidth: `${leftColWidth}px` }}
          >
            Год
          </span>
          <span
            className="text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }}
          >
            {book.year}
          </span>
        </div>
      )}

      {/* Страниц */}
      {book.pages && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ minWidth: `${leftColWidth}px` }}
          >
            Страниц
          </span>
          <span
            className="text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }}
          >
            {book.pages}
          </span>
        </div>
      )}

      {/* Вид издания */}
      {book.pubType && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ minWidth: `${leftColWidth}px` }}
          >
            Вид издания
          </span>
          <span
            className="text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }}
          >
            {book.pubType}
          </span>
        </div>
      )}

      {/* Каталог */}
      {book.discipline && book.discipline.name && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ minWidth: `${leftColWidth}px` }}
          >
            Каталог
          </span>
          <span
            className="text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }}
          >
            {book.discipline.name}
          </span>
        </div>
      )}

      <h3 className="text-xl font-bold mb-4 mt-6">Описание</h3>

      {/* Краткое содержание */}
      {book.annotation && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ minWidth: `${leftColWidth}px` }}
          >
            Краткое содержание книги (аннотация)
          </span>
          <span
            className="text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }}
          >
            {book.annotation}
          </span>
        </div>
      )}

      {/* Основные темы */}
      {book.keyWords  && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ width: `${leftColWidth}px` }}
          >
            Основные темы и ключевые вопросы
          </span>
          <span
            className="flex flex-wrap gap-2 text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }}
          >
            {book.keyWords.map((a, index) => (
              <span key={index} className="relative">
                {a.name}
                {index < book.keyWords.length - 1 && (
                  <span className="ml-2 text-gray-700 align-middle">·</span>
                )}
              </span>
            ))}
          </span>
        </div>
      )}

      {/* Особенности книги */}
      {book.features  && (
        <div className="flex mb-1 text-sm">
          <span
            className="font-medium text-gray-700 mr-4"
            style={{ width: `${leftColWidth}px` }}
          >
            Особенности книги
          </span>
          <span
            className="flex flex-wrap gap-2 text-gray-700 break-words"
            style={{ maxWidth: `calc(100% - ${leftColWidth + 16}px)` }}
          >
            {book.features.map((a, index) => (
              <span key={index} className="relative">
                {a.name}
                {index < book.features.length - 1 && (
                  <span className="ml-2 text-gray-700 align-middle">·</span>
                )}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default AboutBookTab;
