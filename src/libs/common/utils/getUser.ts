import axios from 'axios';
import { BE_API_URL } from '@/libs/common/constants/api';
export function getUser() {
  // console.log('Getting user');
  return axios
    .get(`${BE_API_URL}/auth/getMe`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
}
