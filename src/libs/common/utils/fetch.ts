import axios from 'axios';
import { BE_API_URL } from '@/libs/common/constants/api';
import { EErrorMessage } from '../constants/error';
const BASE_URL = BE_API_URL || 'http://localhost:3000';
const customAxiosWithCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});
export const generateRefreshToken = async () => {
  try {
    axios.post(
      `${BASE_URL}/auth/refresh`,
      {},
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
customAxiosWithCredentials.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log('Error', error.response);

    if (
      error.response.status === 401 &&
      error.response.data.message == EErrorMessage.TOKEN_INVALID &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }
        );
        return customAxiosWithCredentials(originalRequest);
      } catch (refreshError) {
        console.log('Refresh error', refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export function getUser() {
  return customAxiosWithCredentials.get(`/auth/getMe`).then((res) => res.data);
}
