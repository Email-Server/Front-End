import { create } from "zustand";

const useComposeModal = create((set) => ({
  isOpen: false,
  email: "",
  setEmail: (email) => set((state) => ({ email })),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useComposeModal;
