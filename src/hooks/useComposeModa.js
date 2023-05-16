import { create } from "zustand";

const useComposeModal = create((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useComposeModal;
