import React, { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const savedThemeMode = localStorage.getItem('themeMode') || 'light';
    setCurrentTheme(savedThemeMode === 'dark' ? darkTheme : lightTheme);
  }, []);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme.palette.mode === 'light' ? darkTheme : lightTheme
    );
  };

  useEffect(() => {
    localStorage.setItem('themeMode', currentTheme.palette.mode);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}