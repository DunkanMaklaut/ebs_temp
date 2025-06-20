import React, { useRef, useState, useEffect } from 'react';
import './CollectionList.css';

const CollectionList = ({
    collectionId,
    collectionName,
    hideMoreDetails,
    books,
    onMoreDetails,
    onBookClick,
    customClassName = ''
}) => {
    const booksContainerRef = useRef();
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!hideMoreDetails) {
            const checkScroll = () => {
                const container = booksContainerRef.current;
                if (container) {
                    const { scrollLeft, scrollWidth, clientWidth } = container;
                    setShowLeftButton(isHovered && scrollLeft > 0);
                    setShowRightButton(isHovered && scrollWidth > scrollLeft + clientWidth);
                }
            };

            checkScroll();
            window.addEventListener('resize', checkScroll);
            const container = booksContainerRef.current;
            container?.addEventListener('scroll', checkScroll);

            return () => {
                window.removeEventListener('resize', checkScroll);
                container?.removeEventListener('scroll', checkScroll);
            };
        }
    }, [books, isHovered, hideMoreDetails]);

    const scroll = (direction) => {
        if (booksContainerRef.current) {
            booksContainerRef.current.scrollBy({ left: direction * 200, behavior: 'smooth' });
        }
    };

    return (
        <div className={customClassName ? `collection-list-only ${customClassName}` : `collection-container ${customClassName}`}>
            {!customClassName && (
                <div className="collection-header">
                    <div className="collection-info">
                        <h2 className="collection-title" onClick={() => onMoreDetails(collectionId)}>
                            {collectionName}
                        </h2>
                    </div>
                    {!hideMoreDetails && (
                        <button className="collection-more-button" onClick={() => onMoreDetails(collectionId)}>Все</button>
                    )}
                </div>
            )}

            <div
                className={customClassName ? 'similar-list' : hideMoreDetails ? 'collection-grid' : 'collection-list'}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {!hideMoreDetails && showLeftButton && (
                    <button className="scroll-button scroll-button-left" onClick={() => scroll(-1)}>
                        &lt;
                    </button>
                )}

                <div className={hideMoreDetails ? 'books-grid' : 'books'} ref={booksContainerRef}>
                    {books.map((book, index) => (
                        <div key={index} className="book-item" onClick={() => onBookClick(book.id)}>
                            <img src={book.cover} alt={book.title} className="book-cover" />
                            <div className="book-info">
                                <h3 className="collection-book-title">{book.title}</h3>
                                <p className="book-subtitle">{book.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {!hideMoreDetails && showRightButton && (
                    <button className="scroll-button scroll-button-right" onClick={() => scroll(1)}>
                        &gt;
                    </button>
                )}
            </div>
        </div>
    );
};

export default CollectionList;
