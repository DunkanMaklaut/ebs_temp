import React from 'react';
import './bookCard.css';
import { IconRead, IconShare, IconFavorite, IconAddCollection  } from '@components/icons';
import RatingBook from '@components/rating/ratingBook.jsx';
const BookCard = ({ book, setActiveTab, reviewCount, onReaderClick}) => { 
  const cover = `data:image/jpeg;base64,${book.coverSheet}` || '/images/emptycover.jpg';

  const handleDetailsClick = () => {
    setActiveTab('about'); 
  };

  const getReviewLabel = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) return 'отзыв';
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'отзыва';
    return 'отзывов';
  };

  return (
    <div className="book-card-container">
      <div className="book-card">
        <div className="book-cover-container">
          <img src={cover} alt="Обложка книги" className="book-bigger-cover" />
        </div>

        <div className="book-content">
          <div className="book-header-wrapper">
            <div className="book-header">
              <h2 className="card-book-title">{book.name}</h2>
              <div className="book-stats">
                <div className="book-rating-wrapper">
                <RatingBook rating={book.rating || 0} />
                  <span className="dot-separator" />
                  <span className="review-count">{reviewCount} {getReviewLabel(reviewCount)} </span>
                  <span className="book-isbn">
                    <strong>ISBN:</strong> {book.isbn}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="book-actions">
                <button className="action-btn read-btn" title="Читать" onClick={() => onReaderClick(book.id)}>
                    <IconRead size="20" color="#fff"/>
                  <span className="text">Читать</span>
                </button>

                <div className="secondary-actions">
                    <button className="action-btn" title="Добавить в избранное">
                      <IconFavorite size="20" color="#838C98"/>
                    </button>
                    <button className="action-btn" title="Добавить в коллекцию">
                      <IconAddCollection size="20" color="#838C98"/>
                    </button>
                    <button className="action-btn" title="Поделиться">
                    <IconShare size="20" color="#838C98"/>
                    </button>
                </div>
            </div>
          </div>
            
          <div className="book-details">
            <div className="details-title-row">
                <h3 className="details-title">О книге</h3>
                <button className="text-button" onClick={handleDetailsClick} >Подробная характеристика</button>
            </div>
            <div className="detail-row">
              <span className="detail-label">Автор</span>
              <span className="detail-value authors-list">
                  {book.authors.map((a, index) => (
                  <span key={index} className="author">
                      {a.fullName}
                      {index < book.authors.length - 1 && <span className="dot"></span>}
                  </span>
                  ))}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Издательство</span>
              <span className="detail-value">{book.publisher.name}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Год</span>
              <span className="detail-value">{book.year}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Страниц</span>
              <span className="detail-value">{book.pages}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Вид издания</span>
              <span className="detail-value">{book.pubType}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Каталог</span>
              <span className="catalog-tag">{book.discipline.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
