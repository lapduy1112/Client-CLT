'use client';

import { useStore } from '@/providers/ZustandProvider';
import { getUser } from '@/libs/common/utils/getUser';
import { useQuery } from '@tanstack/react-query';
import { PermissionInterface } from '@/libs/common/interfaces/permission.interface';
import { UserInterface } from '@/libs/common/interfaces/user.interface';
import { useEffect } from 'react';

function UserInitialDataProvider({ children }: React.PropsWithChildren) {
  const setUser = useStore((state) => state.setUser);
  const deleteUser = useStore((state) => state.deleteUser);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  useEffect(() => {
    if (data) {
      const permission: PermissionInterface[] = data.role
        .permission as PermissionInterface[];
      const user: UserInterface = {
        ...data,
        role: data.role.role,
        permission: permission,
      };
      setUser(user);
      setUser(user);
    }
  }, [data]);
  useEffect(() => {
    if (error && (error as any).status && (error as any).status === 401) {
      deleteUser();
    }
  }, [error]);

  return <div>{children}</div>;
}

export default UserInitialDataProvider;
