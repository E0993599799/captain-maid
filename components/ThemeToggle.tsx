'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="p-2 rounded-[16px] w-9 h-9" aria-label="Toggle Dark Mode" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-[16px] hover:bg-captain-soft transition-colors duration-180 flex items-center justify-center text-captain-text group"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="group-hover:text-captain-primary transition-colors" />
      ) : (
        <Moon size={20} className="group-hover:text-captain-primary transition-colors" />
      )}
    </button>
  );
}