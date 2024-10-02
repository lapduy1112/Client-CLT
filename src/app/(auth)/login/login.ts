// 'use server';

// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import {
//   BE_API_URL,
//   AT_TIMEOUT,
//   RT_TIMEOUT,
// } from '@/libs/common/constants/api';
// import { getErrorMessage } from '@/libs/common/utils/error';
// import { FormError } from '@/libs/common/interfaces/form-error.interface';
// import { ACCESS_COOKIE, REFRESH_COOKIE } from '../auth-cookie';

// export default async function login(_prevState: FormError, formData: FormData) {
//   console.log('Form data', Object.fromEntries(formData));
//   const res = await fetch(`${BE_API_URL}/auth/local/signin`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(Object.fromEntries(formData)),
//   });
//   const parsedRes = await res.json();
//   console.log('Response', parsedRes);
//   if (!res.ok) {
//     return { error: getErrorMessage(parsedRes) };
//   }
//   setAuthCookie(parsedRes);
//   redirect('/');
// }

// const setAuthCookie = async (response: any) => {
//   const access_token = response?.access_token;
//   const refresh_token = response?.refresh_token;
//   // console.log(access_token);
//   // console.log(refresh_token);
//   if (access_token && refresh_token) {
//     console.log('Setting cookies');
//     cookies().set({
//       name: ACCESS_COOKIE,
//       value: access_token,
//       secure: true,
//       httpOnly: true,
//       expires: Number(AT_TIMEOUT),
//     });
//     cookies().set({
//       name: REFRESH_COOKIE,
//       value: refresh_token,
//       secure: true,
//       httpOnly: true,
//       expires: Number(RT_TIMEOUT),
//     });
//   }
// };
import axios from 'axios';
import { BE_API_URL } from '@/libs/common/constants/api';
import { useStore } from '@/providers/ZustandProvider';
import { useMutation } from '@tanstack/react-query';
export function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return axios
    .post(
      `${BE_API_URL}/auth/local/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => res.data);
}
