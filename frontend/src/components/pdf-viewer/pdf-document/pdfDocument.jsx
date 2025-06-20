'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState, useMemo } from 'react';

import styles from './pdfDocument.module.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';


export default function PdfDocument({
  fileUrl,
  currentPage,
  numPages,
  pageSize,
  scale,
  theme,
  loading,
  onDocumentLoadSuccess,
  onPageLoadSuccess,
  onPageClick
}) {
  const [mounted, setMounted] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  const [pageLoading, setPageLoading] = useState(true);

  const documentOptions = useMemo(() => ({
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    disableStream: true,
    disableAutoFetch: true,
  }), []);

  useEffect(() => {
    setPageLoading(true);
  }, [currentPage]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return <div style={{ color: theme.text }}>Инициализация PDF...</div>;
  }

  if (pdfError) {
    return (
      <div className={styles.errorContainer} style={{ color: theme.text }}>
        <p>{pdfError}</p>
      </div>
    );
  }

  if (!fileUrl) {
    return <div style={{ color: theme.text }}>Документ не загружен</div>;
  }

  const safeCurrentPage = Math.max(1, Math.min(
    Number(currentPage) || 1,
    Number(numPages) || 1
  ));

  return (
    <div className={styles.documentWrapper}>
      {loading ? (
        <p style={{ color: theme.text }}>Загрузка PDF...</p>
      ) : (
        <div className={styles.scrollContainer}>
          <Document 
            file={fileUrl} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              console.error('PDF load error:', error);
              setPdfError('Не удалось загрузить PDF документ');
            }}
            loading={<div className={styles.loading}>Загрузка страницы...</div>}
            error={<div className={styles.error}>Ошибка при загрузке PDF</div>}
            options={documentOptions}
            onItemClick={({ pageNumber }) => {
              if (onPageClick) {
                onPageClick(pageNumber);
              }
            }}
          >
            <Page
              pageNumber={currentPage}
              width={pageSize.width}
              scale={scale}
              onLoadSuccess={(page) => {
                setPageLoading(false);
                onPageLoadSuccess?.(page);
              }}
              onRenderError={(error) => {
                console.error('Page render error:', error);
              }}
              onRenderSuccess={() => {
                setPageLoading(false);
              }}
              canvasBackground="white"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      )}
    </div>
  );
}
