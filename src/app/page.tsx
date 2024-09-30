'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/providers/ZustandProvider';
import { getUser } from '@/libs/common/utils/getUser';
import { useQuery } from '@tanstack/react-query';
import { PermissionInterface } from '@/libs/common/interfaces/permission.interface';
import { UserInterface } from '@/libs/common/interfaces/user.interface';
export default function HomeRedirect() {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
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
    router.push('/home');
  }, [router]);

  return null;
}
