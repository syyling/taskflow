import { useDarkMode } from '@/contexts/ThemeContext.tsx';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return isDarkMode ? (
    <Sun size={18} className="text-foreground cursor-pointer" onClick={toggleDarkMode} />
  ) : (
    <Moon size={18} className="text-foreground cursor-pointer" onClick={toggleDarkMode} />
  );
}
