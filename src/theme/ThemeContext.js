import React, { createContext, useContext, useState, useCallback } from 'react';
import { Colors } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? Colors.dark : Colors.light;

  const toggleTheme = useCallback(async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    try {
      await AsyncStorage.setItem('theme_preference', newValue ? 'dark' : 'light');
    } catch (e) {}
  }, [isDark]);

  const loadTheme = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem('theme_preference');
      if (saved === 'light') {
        setIsDark(false);
      } else if (saved === 'dark') {
        setIsDark(true);
      }
    } catch (e) {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, loadTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
