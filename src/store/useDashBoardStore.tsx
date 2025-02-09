import { create } from "zustand";


const useDashBoardStore = create((set) => ({
  checked: false,

  setChecked: () => set((state) => ({ checked: !state.checked })),
}));

export default useDashBoardStore;
