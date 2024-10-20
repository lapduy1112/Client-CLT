'use client';

import { useStore } from '@/providers/ZustandProvider';
import { getUser } from '@/libs/common/utils/fetch';
// import { getUser } from "@/libs/common/utils/getUser";
import { useQuery } from '@tanstack/react-query';
import { PermissionInterface } from '@/libs/common/interfaces/permission.interface';
import { UserInterface } from '@/libs/common/interfaces/user.interface';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import React from 'react';
function UserInitialDataProvider({ children }: React.PropsWithChildren) {
  const setUser = useStore((state) => state.setUser);
  const deleteUser = useStore((state) => state.deleteUser);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['user', { id: '0' }],
    queryFn: getUser,
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 60 * 1,
    gcTime: 1000 * 60 * 60 * 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data) {
      // console.log('data', data);
      const permission: PermissionInterface[] = data.role
        .permission as PermissionInterface[];
      const user: UserInterface = {
        ...data,
        role: data.role.role,
        permission: permission,
      };
      setUser(user);
    }
  }, [data]);
  useEffect(() => {
    if (error && (error as any).status && (error as any).status === 401) {
      deleteUser();
    }
  }, [error]);

  return <>{isPending ? <Loading /> : <div>{children}</div>}</>;
}
// function UserInitialDataProvider({ children }: React.PropsWithChildren) {
//   console.log('UserInitialDataProvider');
//   const { isPending, isError, data, error } = useQuery({
//     queryKey: ['user'],
//     queryFn: getUser,
//     retry: false,
//   });
//   console.log(data);
//   useEffect(() => {
//     if (error && (error as any).status && (error as any).status === 401) {
//       sessionStorage.removeItem('user');
//     }
//   }, [error]);

//   return (
//     <UserStoreProvider
//       initialUser={
//         {
//           ...data,
//           role: data.role.role,
//           permission: data.role.permission as PermissionInterface[],
//         } as UserInterface
//       }
//     >
//       {children}
//     </UserStoreProvider>
//   );
// }
export default UserInitialDataProvider;
