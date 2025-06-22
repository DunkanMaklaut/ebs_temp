import React, { useRef, useState, useEffect } from "react";

const CollectionList = ({
  collectionId,
  collectionName,
  hideMoreDetails,
  books,
  onMoreDetails,
  onBookClick,
  customClassName = "",
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
          setShowRightButton(
            isHovered && scrollWidth > scrollLeft + clientWidth
          );
        }
      };

      checkScroll();
      window.addEventListener("resize", checkScroll);
      const container = booksContainerRef.current;
      container?.addEventListener("scroll", checkScroll);

      return () => {
        window.removeEventListener("resize", checkScroll);
        container?.removeEventListener("scroll", checkScroll);
      };
    }
  }, [books, isHovered, hideMoreDetails]);

  const scroll = (direction) => {
    if (booksContainerRef.current) {
      booksContainerRef.current.scrollBy({
        left: direction * 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`w-full mb-8 ${customClassName}`}>
      {!customClassName && (
        <div className="flex justify-between items-center mb-2">
          <h2
            className="text-xl md:text-2xl font-semibold text-gray-800 cursor-pointer"
            onClick={() => onMoreDetails(collectionId)}
          >
            {collectionName}
          </h2>
          {!hideMoreDetails && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm md:text-base"
              onClick={() => onMoreDetails(collectionId)}
            >
              Все
            </button>
          )}
        </div>
      )}

      <div
        className={`relative rounded-xl bg-white p-4 ${
          customClassName ? "" : "overflow-hidden"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!hideMoreDetails && showLeftButton && (
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-white rounded-full p-2 z-10"
            onClick={() => scroll(-1)}
          >
            &lt;
          </button>
        )}

        <div
          ref={booksContainerRef}
          className={`flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide ${
            hideMoreDetails ? "flex-wrap justify-center" : ""
          }`}
        >
          {books.map((book, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] cursor-pointer"
              onClick={() => onBookClick(book.id)}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full aspect-[2/3] object-cover rounded-lg border border-gray-300"
              />
              <div className="mt-2 text-sm">
                <h3 className="font-semibold truncate">{book.title}</h3>
                <p className="text-gray-500 text-xs truncate">
                  {book.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!hideMoreDetails && showRightButton && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white rounded-full p-2 z-10"
            onClick={() => scroll(1)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default CollectionList;
