'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import Header from './header/header.jsx';
import styles from './pdfViewer.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BookmarksModal = dynamic(() => import('./bookmarks-modal/bookmarksModal.jsx'), { ssr: false });
const SettingsModal = dynamic(() => import('./settings-modal/settingsModal.jsx'), { ssr: false });
const PdfDocument = dynamic(() => import('./pdf-document/pdfDocument.jsx'), { 
  ssr: false,
  loading: () => <p>Загрузка читалки...</p>
});

export function PdfViewer({ API_BASE_URL }) {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [cookies, setCookie] = useCookies(['bookmarks']);

  

  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [pageSize, setPageSize] = useState({ width: 800, height: 0 });
  const [theme, setTheme] = useState({
    background: '#ffffff',
    text: '#000000',
    paper: '#f5f5f5',
    pdfText: '#000000',
    pdfHighlight: '#ffff00', 
    pdfSize: '16px' 
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    if (!id) return;
    
    fetch(`${API_BASE_URL}/api/book/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки информации о книге');
        return res.json();
      })
      .then(data => setBook(data))
      .catch(err => {
        console.error('Ошибка:', err);
        toast.error('Не удалось загрузить информацию о книге');
      });
  }, [id]);

  useEffect(() => {
    setMounted(true);

    if (!Promise.withResolvers) {
      Promise.withResolvers = function() {
        let resolve, reject;
        const promise = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });
        return { promise, resolve, reject };
      };
    }

    // Загрузка закладок
    if (cookies.bookmarks?.[id]) {
      const page = Number(cookies.bookmarks[id]);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
        toast.success(`Восстановлена закладка на странице ${page}`, {
          position: 'bottom-center',
          duration: 2000
        });
      }
    }
  }, [id]);

  useEffect(() => {
    if (!id || !mounted) return;

    const url = `${API_BASE_URL}/api/pdf/${id}`;
    setFileUrl(url);
    setLoading(false);
  }, [id, mounted]);


  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const maxWidth = isFullscreen 
        ? Math.min(window.innerWidth * 0.95, 1200) 
        : Math.min(window.innerWidth * 0.8, 800);
      setPageSize(prev => ({ ...prev, width: maxWidth }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullscreen, mounted]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = (page) => {
    const viewport = page.getViewport({ scale: 1 });
    const scaledHeight = viewport.height * (pageSize.width / viewport.width);
    setPageSize(prev => ({
      ...prev,
      height: scaledHeight
    }));
  };

  const goToPrevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
  };

  const goToNextPage = () => {
    const newPage = Math.min(currentPage + 1, numPages);
    setCurrentPage(newPage);
  };

  const goToPage = (pageNumber) => {
    const newPage = Math.max(1, Math.min(pageNumber, numPages));
    setCurrentPage(newPage);
  };

  const hasBookmark = () => {
    if (!cookies.bookmarks?.[id]) return false;
    const bookmarksForDoc = cookies.bookmarks[id];
    return Object.values(bookmarksForDoc).some(page => Number(page) === currentPage);
  };
  
  const saveBookmark = (bookmarkName = `Страница ${currentPage}`) => {
    if (!mounted) return;
    
    const bookmarkValue = currentPage.toString(); // Просто номер страницы как строка
    
    const newBookmarks = { 
      ...(cookies.bookmarks || {}), 
      [id]: {
        ...(cookies.bookmarks?.[id] || {}),
        [bookmarkName]: bookmarkValue // Сохраняем строку, а не объект
      }
    };
    
    setCookie('bookmarks', newBookmarks, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    toast.success(`Закладка "${bookmarkName}" сохранена!`, {
      position: 'bottom-center',
      duration: 2000
    });
  };

  
  const removeBookmark = () => {
    if (!mounted) return;
  
    const bookmarksForDoc = cookies.bookmarks?.[id] || {};
    const bookmarkName = Object.entries(bookmarksForDoc)
      .find(([_, page]) => Number(page) === currentPage)?.[0];
  
    if (bookmarkName) {
      const newBookmarks = { ...cookies.bookmarks };
      
      // Удаляем закладку
      delete newBookmarks[id][bookmarkName];
      
      // Если больше нет закладок для этой книги, удаляем весь объект
      if (Object.keys(newBookmarks[id]).length === 0) {
        delete newBookmarks[id];
      }
      
      setCookie('bookmarks', newBookmarks, { path: '/', maxAge: 60 * 60 * 24 * 365 });
      toast.success(`Закладка удалена!`, {
        position: 'bottom-center',
        duration: 2000
      });
      return true;
    }
    return false;
  };
  
  const navigateToBookmark = (bookId, pageNumber) => {
    if (!mounted) return;
  
    if (bookId === id) {
      setCurrentPage(pageNumber);
      setShowBookmarks(false);
    } else {
      // Сохраняем текущую позицию перед переходом
      const newBookmarks = { 
        ...(cookies.bookmarks || {}), 
        [id]: {
          ...(cookies.bookmarks?.[id] || {}),
          'Последняя позиция': currentPage.toString()
        }
      };
      setCookie('bookmarks', newBookmarks, { path: '/', maxAge: 60 * 60 * 24 * 365 });
      router.push(`/reader/${bookId}?page=${pageNumber}`);
    }
  };

  const toggleFullscreen = () => {
    if (!mounted) return;

    const container = document.querySelector('.pdf-container');
    if (!document.fullscreenElement) {
      container?.requestFullscreen().then(() => {
        setIsFullscreen(true);
        setScale(1.2);
      }).catch(err => {
        console.error('Ошибка полноэкранного режима:', err);
        toast.error('Не удалось перейти в полноэкранный режим');
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        setScale(1);
      });
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const changeTheme = (typeOrPreset, color) => {
    if (typeof typeOrPreset === 'string') {
      setTheme(prev => ({ ...prev, [typeOrPreset]: color }));
    } else {
      setTheme(typeOrPreset);
    }
  };

  const presetThemes = [
    { name: 'Светлая', background: '#ffffff', text: '#000000', paper: '#f5f5f5' },
    { name: 'Тёмная', background: '#1a1a1a', text: '#ffffff', paper: '#2d2d2d' },
    { name: 'Сепия', background: '#f4ecd8', text: '#5b4636', paper: '#e4d4b1' },
    { name: 'Ночной', background: '#0a0a12', text: '#e0e0e0', paper: '#1a1a2e' }
  ];

  

  if (!mounted) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  return (
    <div className={`${styles.container} pdf-container`} style={{ backgroundColor: theme.background, color: theme.text }}>
  <div className={`${styles.container} pdf-container`} style={{ backgroundColor: theme.background, color: theme.text }}>
      <Header 
        theme={theme}
        isFullscreen={isFullscreen}
        hasBookmark={hasBookmark()}
        book={book}
        currentPage={currentPage}
        numPages={numPages}
        onBack={() => router.push(`/book/${id}`)}
        onToggleBookmarks={() => setShowBookmarks(!showBookmarks)}
        onToggleBookmark={hasBookmark() ? removeBookmark : saveBookmark}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onToggleFullscreen={toggleFullscreen}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onPageChange={goToPage}
        onPrevPage={goToPrevPage}
        onNextPage={goToNextPage}
      />

      {showBookmarks && (
        <BookmarksModal 
          isOpen={showBookmarks}
          onClose={() => setShowBookmarks(false)}
          bookmarks={cookies.bookmarks}
          currentId={id}
          theme={theme}
          book={book}
          currentPage={currentPage}
          onNavigate={navigateToBookmark}
          onRemoveBookmark={removeBookmark}
          onAddBookmark={saveBookmark}
        />
      )}

      {showSettings && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          theme={theme}
          presetThemes={presetThemes}
          onThemeChange={changeTheme}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          scale={scale}
        />
      )}

    <div className={styles.contentWrapper}>
      <button
        className={`${styles.navButton} ${styles.leftButton}`}
        style={{ backgroundColor: theme.paper }}
        onClick={goToPrevPage}
      >
        <FaChevronLeft style={{ color: theme.text }}/>
      </button>

        <PdfDocument
          fileUrl={fileUrl}
          currentPage={currentPage}
          numPages={numPages}
          pageSize={pageSize}
          scale={scale}
          theme={theme}
          loading={loading}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          onPageLoadSuccess={onPageLoadSuccess}
          onPageClick={goToPage}
        />
        <button
          className={`${styles.navButton} ${styles.rightButton}`}
          style={{ backgroundColor: theme.paper }}
          onClick={goToNextPage}
        >
          <FaChevronRight style={{ color: theme.text }}/>
        </button>
      </div>
    </div>
  </div>
  );
}