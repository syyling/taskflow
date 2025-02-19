import { create } from "zustand";
import { DashboardState } from "@/types/stores.tsx";

const useDashBoardStore = create<DashboardState>((set) => ({
  checked: false,

  setChecked: () => set((state) => ({ checked: !state.checked })),
}));

export default useDashBoardStore;
