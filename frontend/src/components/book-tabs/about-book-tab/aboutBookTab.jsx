import React from 'react';
import './aboutBookTab.css';

const AboutBookTab = ({ book }) => {
  return (
    <div className="about-book-tab">
      <h3 className="about-section-title">Основные сведения</h3>
      
      {/* Автор */}
      {book.authors && book.authors.length > 0 && (
        <div className="about-detail-row">
          <span className="about-detail-label">Автор</span>
          <span className="about-detail-value about-list">
            {book.authors.map((a, index) => (
              <span key={index} className="about-item">
                {a.fullName}
                {index < book.authors.length - 1 && <span className="dot"></span>}
              </span>
            ))}
          </span>
        </div>
      )}

      {/* Издательство */}
      {book.publisher && book.publisher.name && (
        <div className="about-detail-row">
          <span className="about-detail-label">Издательство</span>
          <span className="about-detail-value">{book.publisher.name}</span>
        </div>
      )}

      {/* Год */}
      {book.year && (
        <div className="about-detail-row">
          <span className="about-detail-label">Год</span>
          <span className="about-detail-value">{book.year}</span>
        </div>
      )}

      {/* Страниц */}
      {book.pages && (
        <div className="about-detail-row">
          <span className="about-detail-label">Страниц</span>
          <span className="about-detail-value">{book.pages}</span>
        </div>
      )}

      {/* Вид издания */}
      {book.pubType && (
        <div className="about-detail-row">
          <span className="about-detail-label">Вид издания</span>
          <span className="about-detail-value">{book.pubType}</span>
        </div>
      )}

      {/* Каталог */}
      {book.discipline && book.discipline.name && (
        <div className="about-detail-row">
          <span className="about-detail-label">Каталог</span>
          <span className="about-detail-value">{book.discipline.name}</span>
        </div>
      )}

      <h3 className="about-section-title">Описание</h3>

      {/* Краткое содержание */}
      {book.annotation && (
        <div className="about-detail-row">
          <span className="about-detail-label">Краткое содержание книги (аннотация)</span>
          <span className="about-detail-value">{book.annotation}</span>
        </div>
      )}

      {/* Основные темы */}
      {book.keyWords && book.keyWords.length > 0 && (
        <div className="about-detail-row">
          <span className="about-detail-label">Основные темы и ключевые вопросы</span>
          <span className="about-detail-value about-list">
            {book.keyWords.map((a, index) => (
              <span key={index} className="about-item">
                {a.name}
                {index < book.keyWords.length - 1 && <span className="dot"></span>}
              </span>
            ))}
          </span>
        </div>
      )}

      {/* Особенности книги */}
      {book.features && book.features.length > 0 && (
        <div className="about-detail-row">
          <span className="about-detail-label">Особенности книги</span>
          <span className="about-detail-value about-list">
            {book.features.map((a, index) => (
              <span key={index} className="about-item">
                {a.name}
                {index < book.features.length - 1 && <span className="dot"></span>}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default AboutBookTab;
