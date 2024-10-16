import { UserInterface } from "@/libs/common/interfaces/user.interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type UserStore = {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
  deleteUser: () => void;
};

export const useStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserInterface) => set({ user: user }),
      deleteUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
