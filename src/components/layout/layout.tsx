import React, { useState } from "react";
import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import useSidebarStore from "@/store/useSidebarStore.tsx";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const setIsSidebarCollapsed = useSidebarStore(
    (state) => state.setIsSidebarCollapsed,
  );

  const handleMenuClick = () => {
    setIsSidebarOpen();
  };

  // 사이드바 접기/펼치기
  const handleSidebarCollapse = () => {
    setIsSidebarCollapsed();
  };

  return (
    <div className="w-full min-h-screen relative">
      <Sidebar onClose={setIsSidebarOpen} onCollapse={handleSidebarCollapse} />
      <Header onMenuClick={handleMenuClick} />
      <main
        className={`pt-0 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
