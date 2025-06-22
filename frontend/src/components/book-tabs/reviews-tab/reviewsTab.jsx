import React, { useState } from 'react';
import { IconStar } from '@components/icons';
import RatingBook from '@components/rating/ratingBook.jsx';
import API_BASE_URL from '@/config';
import { lightTheme as colors } from '@resources/colors/colors';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((val) => (
        <span
          key={val}
          onClick={() => setRating(val)}
          className="cursor-pointer mr-1"
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
    <div className="mt-1 text-[0.95rem] whitespace-pre-wrap" style={{ color: colors.primaryText }}>
      <p>
        {expanded ? text : (text.length > 300 ? text.slice(0, 300) + '...' : text)}
      </p>
      {isLong && (
        <button
          className="mt-1 text-blue-600 cursor-pointer bg-none border-none p-0"
          onClick={() => setExpanded(!expanded)}
        >
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
    <div className="flex flex-col gap-3 w-full" style={{ color: colors.primaryText }}>
      {!userReviewExists && !submitted && (
        <div className="mb-8">
          <textarea
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            placeholder="Напишите ваш отзыв..."
            rows={3}
            className="w-full p-4 px-8 resize-none overflow-y-auto text-base font-sans rounded-xl border-none box-border"
            style={{
              backgroundColor: colors.primaryBackground,
              color: colors.primaryText,
              fontFamily: "'Inter', sans-serif",
            }}
            onFocus={e => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.outline = 'none';
              e.target.style.border = `2px solid ${colors.primaryBackground}`;
              e.target.style.color = colors.primaryText;
            }}
            onBlur={e => {
              e.target.style.backgroundColor = colors.primaryBackground;
              e.target.style.border = 'none';
            }}
          />
          <div className="flex items-center justify-between gap-4 mt-0.5">
            <StarRating rating={rating} setRating={setRating} />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCancel}
                className="bg-transparent px-4 py-2 text-sm rounded-lg cursor-pointer border-none"
                style={{ color: colors.primaryText }}
              >
                Отмена
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 text-sm rounded-lg cursor-pointer border-none"
                style={{
                  backgroundColor: colors.primaryButton,
                  color: colors.primaryButtonText,
                }}
              >
                Оставить отзыв
              </button>
            </div>
          </div>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="mb-8">
          {reviews.map((r) => (
            <div key={r.id} className="mb-6">
              <div className="flex items-center gap-2 mb-1 text-base font-semibold" style={{ color: colors.primaryText }}>
                <strong>{r.fullUserName}</strong>
                <div>
                  <RatingBook rating={r.rating} />
                </div>
              </div>
              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: colors.primaryBackground }}
              >
                <ReviewText text={r.text} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: colors.primaryText }}>Пока нет отзывов</p>
      )}

      {submitted && (
        <p className="font-bold" style={{ color: 'green' }}>Спасибо за отзыв!</p>
      )}
    </div>
  );
};

export default ReviewsTab;
