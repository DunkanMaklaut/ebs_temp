'use client';

import React, { useEffect } from 'react';
import API_BASE_URL from '@/config';
import { PdfViewer } from '@components/pdf-viewer/pdfViewer.jsx';
import { CookiesProvider } from 'react-cookie';
import { applyTheme } from '@/app/themeUtils.js';
import { lightTheme } from '@resources/colors/colors.js';

export default function PdfViewerPage() {
  useEffect(() => {
      applyTheme(lightTheme);
    }, []);

  return (
    <CookiesProvider>
      <PdfViewer API_BASE_URL={API_BASE_URL} />
    </CookiesProvider>
  );
}