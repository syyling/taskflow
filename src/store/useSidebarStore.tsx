import { create } from "zustand";
import { useState } from "react";

const useSidebarStore = create((set) => ({
  isSidebarOpen: false,
  isSidebarCollapsed: false,

  setIsSidebarOpen: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setIsSidebarCollapsed: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));

export default useSidebarStore;
