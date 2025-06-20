'use client';
import { FaArrowLeft, FaBookOpen, FaBookmark, FaSearchPlus, FaSearchMinus, 
         FaExpand, FaCompress, FaCog, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './header.module.css';

export default function Header({
  theme,
  isFullscreen,
  hasBookmark,
  currentPage,
  numPages,
  onBack,
  onToggleBookmarks,
  onToggleBookmark,
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
  onToggleSettings,
  onPageChange,
}) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <button onClick={onBack} className={styles.iconButton} style={{ backgroundColor: theme.paper }} title="Назад">
          <FaArrowLeft style={{ color: theme.text }}/>
        </button>
        <button onClick={onToggleBookmarks} className={styles.iconButton} style={{ backgroundColor: theme.paper }} title="Закладки">
          <FaBookOpen style={{ color: theme.text }}/>
        </button>
        <button 
          onClick={onToggleBookmark}
          className={styles.iconButton}
          style={{ 
            backgroundColor: theme.paper,
            color: hasBookmark ? '#f39c12' : theme.text
          }}
          title={hasBookmark ? 'Удалить закладку' : 'Сохранить закладку'}
        >
          <FaBookmark />
        </button>
      </div>
      
      <div className={styles.headerCenter}>
        <div className={styles.pageInputContainer}>
          <input
            type="number"
            min="1"
            max={numPages || 1}
            value={currentPage || 1}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                onPageChange(value);
              }
            }}
            style={{ 
              backgroundColor: theme.background, 
              color: theme.text,
              border: `1px solid ${theme.text}`,
            }}
          />
          <span style={{ color: theme.text }}> из {numPages || '?'}</span>
        </div>
      </div>
      
      <div className={styles.headerRight}>
        <button onClick={onZoomOut} className={styles.iconButton} style={{ backgroundColor: theme.paper }} title="Уменьшить">
          <FaSearchMinus style={{ color: theme.text }}/>
        </button>
        <button onClick={onZoomIn} className={styles.iconButton} style={{ backgroundColor: theme.paper }} title="Увеличить">
          <FaSearchPlus style={{ color: theme.text }}/>
        </button>
        <button 
          onClick={onToggleFullscreen} 
          className={styles.iconButton}
          style={{ backgroundColor: theme.paper }}
          title={isFullscreen ? 'Выйти из полноэкранного режима' : 'Полный экран'}
        >
          {isFullscreen ? <FaCompress style={{ color: theme.text }}/> : <FaExpand style={{ color: theme.text }}/> }
        </button>
        <button 
          onClick={onToggleSettings} 
          className={styles.iconButton}
          style={{ backgroundColor: theme.paper }}
          title="Настройки"
        >
          <FaCog style={{ color: theme.text }}/>
        </button>
      </div>
    </div>
  );
}