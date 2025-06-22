import React from 'react';
import AboutBookTab from '@components/book-tabs/about-book-tab/aboutBookTab.jsx';
import SimilarBooksTab from '@components/book-tabs/similar-books/similarBooksTab.jsx';
import ReviewsTab from '@components/book-tabs/reviews-tab/reviewsTab.jsx';
import { IconCopy } from '@components/icons';
import { lightTheme as colors } from '@resources/colors/colors';

const tabs = [
  { key: 'about', label: 'О книге' },
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
      case 'similar':
        return (
          <SimilarBooksTab
            bookId={book?.id}
            similarBooks={similarBooks}
            onBookClick={(id) => window.location.href = `/book/${id}`}
          />
        );
      case 'reviews':
        return <ReviewsTab reviews={reviews} userReviewExists={userReviewExists} />;
      case 'bib':
        return (
          <div className="flex flex-col gap-3">
            <div
              className="rounded-lg p-4 text-base leading-relaxed whitespace-pre-line"
              style={{
                backgroundColor: colors.primaryBackground,
                borderColor: colors.primaryLine,
                color: colors.primaryText,
              }}
            >
              {generateCitation()}
            </div>
            <button
              className="inline-flex items-center gap-2 bg-transparent border-none font-medium cursor-pointer p-1.5 rounded-md transition-colors hover:bg-transparent text-base"
              style={{ color: colors.primaryButton }}
              onClick={handleCopy}
              type="button"
            >
              <IconCopy color={colors.primaryButton} size={21} />
              <span>Скопировать</span>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

    return (
    <div
  className="flex justify-center my-8 rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full px-3"
  style={{ backgroundColor: colors.secondaryBackground }}
>
  <div className="w-full p-6 sm:p-4 px-4 flex flex-col gap-4">
    <div
      className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            className="flex-shrink-0 px-3 py-2 rounded-xl text-sm transition-colors duration-200"
            onClick={() => setActiveTab(tab.key)}
            type="button"
            style={{
              backgroundColor: isActive ? colors.primaryButton : 'transparent',
              color: isActive ? colors.primaryButtonText : colors.primaryText,
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
    <div
      className="pt-4 rounded-lg overflow-y-auto"
      style={{
        backgroundColor: colors.secondaryBackground,
        borderColor: colors.primaryLine,
        height: '50vh', // регулируй под свои нужды
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      {renderContent()}
    </div>
  </div>
</div>
  );
};

export default BookTabs;
