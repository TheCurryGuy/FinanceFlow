import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useDarkMode, toggleDarkMode } from '../hooks/useDarkMode';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export const ThemeToggle = () => {
  useDarkMode(); // Initialize theme on mount

  // Use useState to track the theme *within* the component
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

   useEffect(() => {
    // Update local state whenever the class changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    const newIsDark = toggleDarkMode(); // Call the toggle function
    setIsDarkMode(newIsDark); // Update the local state
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700" />
      )}
    </button>
  );
};