import UserMenu from '@/features/user/components/UserMenu.tsx';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar.tsx';
import React from 'react';
import useSidebarStore from '@/store/useSidebarStore.tsx';
import { DarkModeToggle } from '@/components/layout/DarkModeToggle.tsx';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const isSidebarCollapsed = useSidebarStore((state) => state.isSidebarCollapsed);

  return (
    <header
      className={`top-0 right-0 left-0 h-12 bg-background border-gray-200 ${isSidebarCollapsed ? 'left-0' : 'left-64'} transition-all duration-200`}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3 ml-4">
          <button
            onClick={onMenuClick}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="h-5 w-px bg-gray-200 hidden sm:block" />
        </div>
        <div className="flex items-center gap-2 mr-4">
          <DarkModeToggle className="text-gray-500 hover:text-gray-800" />
          <UserMenu className="text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;
