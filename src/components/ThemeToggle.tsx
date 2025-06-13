import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, colorTheme, effectiveTheme, setTheme, setColorTheme } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' }
  ];

  const colors = [
    { value: 'blue', color: 'bg-blue-500', label: 'Blue' },
    { value: 'green', color: 'bg-green-500', label: 'Green' },
    { value: 'purple', color: 'bg-purple-500', label: 'Purple' },
    { value: 'orange', color: 'bg-orange-500', label: 'Orange' },
    { value: 'rose', color: 'bg-rose-500', label: 'Rose' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {/* Theme Toggle */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {themes.map(({ value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value as any)}
            className={`p-1.5 rounded-md transition-all duration-200 ${
              theme === value
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Color Picker */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <Palette className="w-4 h-4" />
        </button>

        <AnimatePresence>
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-50"
            >
              <div className="grid grid-cols-5 gap-2">
                {colors.map(({ value, color, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setColorTheme(value as any);
                      setShowColorPicker(false);
                    }}
                    className={`w-8 h-8 rounded-full ${color} relative transition-transform hover:scale-110 ${
                      colorTheme === value ? 'ring-2 ring-gray-400 dark:ring-gray-300' : ''
                    }`}
                    title={label}
                  >
                    {colorTheme === value && (
                      <div className="absolute inset-0 rounded-full border-2 border-white"></div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeToggle;