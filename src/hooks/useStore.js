import { create } from "zustand";
import { persist } from "zustand/middleware";
const useStore = create(
  persist(
    (set) => ({
      login: false,
      userInfo: {},
      setLogin: (data) => set({ login: data }),
      setUserInfo: (data) => set({ userInfo: data }),
    }),
    {
      name: "user-storage", // unique name
    }
  )
);

export default useStore;
