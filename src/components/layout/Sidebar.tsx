import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import useSidebarStore from '@/store/useSidebarStore.tsx';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const Sidebar = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const menuItems: MenuItem[] = [{ icon: LayoutDashboard, label: '대시보드', href: '/' }];

  // 사이드바 닫기 핸들러
  const handleClose = () => {
    setIsSidebarOpen();
  };
  return (
    <>
      {/* 오버레이 */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30" onClick={handleClose} />}

      {/* 사이드바 */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-64 bg-background border-r',
          'transition-transform duration-300 ease-in-out',
          !isSidebarOpen && '-translate-x-full'
        )}
      >
        {/* 메뉴 항목들 */}
        <div className="p-4">
          <div className="mt-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
