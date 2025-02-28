import UserMenu from '@/features/user/components/UserMenu.tsx';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar.tsx';
import React from 'react';
import useSidebarStore from '@/store/useSidebarStore.tsx';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const isSidebarCollapsed = useSidebarStore((state) => state.isSidebarCollapsed);

  return (
    <header className={`top-0 right-0 left-0 h-8 bg-background ${isSidebarCollapsed ? 'left-0' : 'left-64'}`}>
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="p-1.5 hover:bg-muted/60 rounded-md ml-2">
            <Menu className="h-4 w-4" />
          </button>
        </div>
        <div className="mr-1">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
