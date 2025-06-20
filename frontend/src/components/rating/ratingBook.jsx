import React from 'react';
import { IconStar } from '@components/icons/IconStar.jsx';
import './ratingBook.css';

const RatingBook = ({ rating }) => {
    return (
      <div className="rating-book">
        <IconStar color="#FFD700" size={18} />
        <span>{rating}</span>
      </div>
    );
  };

  export default RatingBook;