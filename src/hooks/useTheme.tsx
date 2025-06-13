import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ColorTheme = 'blue' | 'green' | 'purple' | 'orange' | 'rose';

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    return stored || 'system';
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem('colorTheme') as ColorTheme;
    return stored || 'blue';
  });

  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateEffectiveTheme = () => {
      if (theme === 'system') {
        setEffectiveTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setEffectiveTheme(theme);
      }
    };

    updateEffectiveTheme();
    mediaQuery.addEventListener('change', updateEffectiveTheme);

    return () => mediaQuery.removeEventListener('change', updateEffectiveTheme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(effectiveTheme);
  }, [theme, effectiveTheme]);

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleSetColorTheme = (newColorTheme: ColorTheme) => {
    setColorTheme(newColorTheme);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        colorTheme, 
        effectiveTheme, 
        setTheme: handleSetTheme, 
        setColorTheme: handleSetColorTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};