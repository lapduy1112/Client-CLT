import axios from 'axios';
import { BE_API_URL } from '@/libs/common/constants/api';
export function register({
  username,
  email,
  password,
  confirmPassword,
}: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return axios
    .post(
      `${BE_API_URL}/auth/local/signup`,
      {
        username,
        email,
        password,
        confirmPassword,
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
