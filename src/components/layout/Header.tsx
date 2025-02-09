import UserMenu from "@/components/layout/UserMenu.tsx";
import { Menu } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar.tsx";
import React from "react";
import useSidebarStore from "@/store/useSidebarStore.tsx";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const isSidebarCollapsed = useSidebarStore(
    (state) => state.isSidebarCollapsed,
  );

  return (
    <div
      className={`top-0 right-0 left-0 h-8 bg-background transition-all duration-300 ${
        isSidebarCollapsed ? "left-0" : "left-64"
      }`}
    >
      <div className="flex h-full items-center px-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-muted rounded-full"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1" />
      </div>
    </div>
  );
};

export default Header;
