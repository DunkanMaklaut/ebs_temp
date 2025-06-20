import React from 'react';
import './bookTabs.css';
import AboutBookTab from '@components/book-tabs/about-book-tab/aboutBookTab.jsx';
import SimilarBooksTab from '@components/book-tabs/similar-books/similarBooksTab.jsx';
import ReviewsTab from '@components/book-tabs/reviews-tab/reviewsTab.jsx';
import { IconCopy } from '@components/icons';


const tabs = [
  { key: 'about', label: 'О книге' },
  //{ key: 'toc', label: 'Оглавление' },
  { key: 'similar', label: 'Похожие книги' },
  { key: 'reviews', label: 'Отзывы' },
  { key: 'bib', label: 'Библиографическое описание' },
];

const BookTabs = ({ book, activeTab, setActiveTab, similarBooks, reviews, userReviewExists }) => {
  const generateCitation = () => {
    if (!book) return 'Бибзапись отсутствует.';

    const authorsShort = book.authors.map(a => a.fullName).join(', ');
    const authorsInitials = book.authors.map(a => {
      const parts = a.fullName.split(' ');
      return parts.reverse().join(' ');
    }).join(', ');

    return `${authorsShort}. ${book.name} : ${book.pubType.toLowerCase()} / ${authorsInitials}. — ${book.publisher.city} : ${book.publisher.name}, ${book.year}. — ${book.pages} с. — ISBN ${book.isbn}.`;
  };

  const handleCopy = () => {
    const citation = generateCitation();
    navigator.clipboard.writeText(citation);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutBookTab book={book} />;
      // case 'toc':
      //   return <p>Здесь будет оглавление</p>;
      case 'similar':
        return <SimilarBooksTab 
               bookId={book?.id} 
               similarBooks={similarBooks} 
               onBookClick={(id) => window.location.href = `/book/${id}`} 
             />;
      case 'reviews':
        return (
          <ReviewsTab 
            reviews={reviews} 
            userReviewExists={userReviewExists}
          />
        );
      case 'bib':
        return (
          <div className="citation-block">
            <div className="citation-card">
              {generateCitation()}
            </div>
            <button className="copy-text-btn" onClick={handleCopy}>
              <IconCopy color="#4285f4" size="21" />
              <span className="copy-label">Скопировать</span>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="book-tabs-container">
      <div className="book-tabs">
        <div className="tabs-header">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default BookTabs;
