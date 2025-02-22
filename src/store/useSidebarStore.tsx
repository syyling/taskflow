import { create } from "zustand";
import { SidebarState } from "@/types/stores.tsx";

const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  isSidebarCollapsed: false,

  setIsSidebarOpen: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setIsSidebarCollapsed: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));

export default useSidebarStore;
