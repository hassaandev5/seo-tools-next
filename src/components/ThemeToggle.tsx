'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';

type ThemeToggleProps = {
  className?: string;
  iconClassName?: string;
  buttonClassName?: string;
};

const ThemeToggle = ({
  className = '',
  iconClassName = 'h-5 w-5',
  buttonClassName = 'p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none'
}: ThemeToggleProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Only show the toggle after mounting to prevent hydration mismatch
  if (!mounted) {
    return <div className={`${className} ${buttonClassName} opacity-0`}></div>;
  }

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className={className}>
      <button
        onClick={toggleDarkMode}
        className={buttonClassName}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <FaSun className={iconClassName} />
        ) : (
          <FaMoon className={iconClassName} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;



// Example usage with custom classes
{/* <ThemeToggle 
  buttonClassName="rounded-full bg-gray-200 dark:bg-gray-700 p-3" 
  iconClassName="h-6 w-6 text-yellow-500 dark:text-blue-300"
/> */}