import axios from "axios";
import { BE_API_URL } from "@/libs/common/constants/api";
export function forgot({ email }: { email: string }) {
  return axios
    .post(
      `${BE_API_URL}/auth/forgot-password`,
      {
        email,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
}
