import { createContext, useState, ReactNode, useContext } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserInterface } from '@/libs/common/interfaces/user.interface';
type UserStore = {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
  deleteUser: () => void;
};

const BearStoreContext = createContext<StoreApi<UserStore> | null>(null);

export const UserStoreProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: UserInterface | null;
}) => {
  const [store] = useState(() =>
    createStore<UserStore>()(
      persist(
        (set) => ({
          user: initialUser,
          setUser: (user: UserInterface) => set({ user }),
          deleteUser: () => set({ user: null }),
        }),
        {
          name: 'user-storage',
          storage: createJSONStorage(() => sessionStorage),
        }
      )
    )
  );

  return (
    <BearStoreContext.Provider value={store}>
      {children}
    </BearStoreContext.Provider>
  );
};
const useUserStore = (selector: any) => {
  const store = useContext(BearStoreContext);
  if (!store) {
    throw new Error('Missing UserStoreProvider');
  }
  return useStore(store, selector);
};
export const useUser = () => useUserStore((state: UserStore) => state.user);
export const useSetUser = () =>
  useUserStore((state: UserStore) => state.setUser);
export const useDeleteUser = (): any =>
  useUserStore((state: UserStore) => state.deleteUser);

// export const useAbilities = () =>
//   useUserStore((state: UserStore) => state.abilities);
// export const useSetAbilities = () =>
//   useUserStore((state: UserStore) => state.setAbilities);
