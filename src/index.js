import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from './context/SnackbarContext';
import AlertSnackbar from './components/Snackbar/AlertSnackbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SnackbarProvider>
      <AlertSnackbar/>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </SnackbarProvider>
  </BrowserRouter>
);
