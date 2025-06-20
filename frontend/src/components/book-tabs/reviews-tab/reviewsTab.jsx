import React, { useState } from 'react';
import { IconStar } from '@components/icons';
import RatingBook from '@components/rating/ratingBook.jsx';
import './reviewsTab.css';
import API_BASE_URL from '@/config'; 

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((val) => (
        <span
          key={val}
          className="star"
          onClick={() => setRating(val)}
          style={{ cursor: 'pointer', marginRight: 4 }}
        >
          <IconStar color={val <= rating ? '#FFD700' : '#CCCCCC'} size={20} />
        </span>
      ))}
    </div>
  );
};

const ReviewText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const lines = text.split('\n');
  const isLong = lines.length > 4 || text.length > 300;

  return (
    <div className="review-text">
      <p style={{ whiteSpace: 'pre-line' }}>
        {expanded ? text : (text.length > 300 ? text.slice(0, 300) + '...' : text)}
      </p>
      {isLong && (
        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Скрыть' : 'Показать полностью'}
        </button>
      )}
    </div>
  );
};

const ReviewsTab = ({ reviews, userReviewExists }) => {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const currentUserId = 1; // Временно
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/review/set`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUserId,
          bookId: reviews[0]?.bookId,
          rating,
          text: newReview,
        }),
      });
  
      const result = await response.text();
      if (result.includes("successfully added")) {
        setSubmitted(true);
        setNewReview('');
        setRating(5);
      } else {
        alert(result);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Произошла ошибка при отправке отзыва');
    }
  };

  const handleCancel = () => {
    setNewReview('');
    setRating(5);
  };

  return (
    <div className="reviews-tab">
      {!userReviewExists && !submitted && (
        <div className="add-review-form" style={{ marginBottom: '2rem' }}>
          <textarea
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            placeholder="Напишите ваш отзыв..."
            rows={3}
          />
          <div className="review-input-row">
            <StarRating rating={rating} setRating={setRating} />
            <div className="review-buttons">
              <button onClick={handleCancel} className="cancel-btn">Отмена</button>
              <button onClick={handleSubmit} className="submit-btn">Оставить отзыв</button>
            </div>
          </div>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="reviews-list" style={{ marginBottom: '2rem' }}>
          {reviews.map((r) => (
          <div key={r.id} className="review-wrapper" style={{ marginBottom: '1.5rem' }}>
            <div className="review-header-outside">
              <strong>{r.fullUserName}</strong>
              <div className="review-rating-inline">
                <RatingBook rating={r.rating}></RatingBook>
              </div>
            </div>
            <div className="review-item">
              <ReviewText text={r.text} />
            </div>
          </div>
        ))}
        </div>
      ) : (
        <p>Пока нет отзывов</p>
      )}

      {submitted && <p className="review-success">Спасибо за отзыв!</p>}
    </div>
  );
};

export default ReviewsTab;
