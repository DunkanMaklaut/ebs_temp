'use client';
import { useState, useEffect } from 'react';
import styles from './bookmarksModal.module.css';

export default function BookmarksModal({ 
  isOpen, 
  onClose, 
  bookmarks, 
  currentId, 
  theme, 
  book,
  onNavigate,
  onRemoveBookmark,
  currentPage,
  onAddBookmark
}) {
  const [newBookmarkName, setNewBookmarkName] = useState('');
  const [mounted, setMounted] = useState(false);
  const [localBookmarks, setLocalBookmarks] = useState(bookmarks);

  useEffect(() => {
    setMounted(true);
    setLocalBookmarks(bookmarks);
  }, [bookmarks]);

  if (!isOpen || !mounted) return null;

  const handleRemoveBookmark = (bookId, bookmarkName) => {
    if (onRemoveBookmark(bookmarkName)) {
      const updatedBookmarks = { ...localBookmarks };
      
      if (updatedBookmarks[bookId]) {
        delete updatedBookmarks[bookId][bookmarkName];
        
        if (Object.keys(updatedBookmarks[bookId]).length === 0) {
          delete updatedBookmarks[bookId];
        }
        
        setLocalBookmarks(updatedBookmarks);
      }
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} style={{ backgroundColor: theme.paper }} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 style={{ color: theme.text }}>Закладки</h3>
          <button 
            onClick={onClose} 
            className={styles.closeButton}
            style={{ color: theme.text }}
          >
            ×
          </button>
        </div>
        
        <div className={styles.addBookmarkForm}>
          <input
            type="text"
            value={newBookmarkName}
            onChange={(e) => setNewBookmarkName(e.target.value)}
            placeholder="Название закладки"
            style={{
              backgroundColor: theme.background,
              color: theme.text,
            }}
          />
          <button 
            onClick={() => {
              if (newBookmarkName.trim()) {
                onAddBookmark(newBookmarkName);
                setNewBookmarkName('');
              }
            }}
          >
            Добавить закладку
          </button>
        </div>
        
        <div className={styles.bookmarksList}>
          {localBookmarks && Object.entries(localBookmarks).map(([bookId, bookmarksList]) => (
            <div key={`book-group-${bookId}`} className={styles.bookGroup}>
              <h4 style={{ color: theme.text }}>
                {bookId === currentId ? (book?.name || `Текущий документ`) : `Документ ${bookId.slice(0, 6)}...`}
              </h4>
              {Object.entries(bookmarksList).map(([name, page]) => (
                <div 
                  key={`bookmark-${bookId}-${name}`}
                  className={`${styles.bookmarkItem} ${
                    bookId === currentId && page == currentPage ? styles.active : ''
                  }`}
                  style={{
                    backgroundColor: theme.background,
                    color: theme.text
                  }}
                >
                  <span 
                    onClick={() => onNavigate(bookId, Number(page))}
                    style={{ cursor: 'pointer' }}
                  >
                    {name} (Страница {page})
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveBookmark(bookId, name);
                    }}
                    className={styles.deleteButton}
                    style={{ color: theme.text }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ))}
          
          {(!localBookmarks || Object.keys(localBookmarks).length === 0) && (
            <p className={styles.noBookmarks} style={{ color: theme.text }}>
              Нет сохраненных закладок
            </p>
          )}
        </div>
      </div>
    </div>
  );
}