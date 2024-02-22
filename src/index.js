import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './utils/themeProvider';
import { CssBaseline } from '@mui/material';
import SnackbarProvider from './context/SnackbarContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n'; // Import your i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <SnackbarProvider >
        <ThemeProvider>
          <CssBaseline />

          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>

        </ThemeProvider>
      </SnackbarProvider>
    </I18nextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
