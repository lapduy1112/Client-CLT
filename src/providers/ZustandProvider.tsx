import { UserInterface } from '@/libs/common/interfaces/user.interface';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export type abilitiesMap = Map<string, boolean>;
type UserStore = {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
  deleteUser: () => void;
  abilities: abilitiesMap;
  setAbilities: (abilities: abilitiesMap) => void;
};

export const useStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserInterface) => set({ user: user }),
      deleteUser: () => set({ user: null }),
      abilities: new Map(),
      setAbilities: (abilities: abilitiesMap) => set({ abilities }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
