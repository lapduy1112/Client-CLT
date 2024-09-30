import { UserInterface } from '@/libs/common/interfaces/user.interface';
import { create } from 'zustand';
type UserStore = {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
  deleteUser: () => void;
};
export const useStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: UserInterface) => set({ user: user }),
  deleteUser: () => set({ user: null }),
}));
