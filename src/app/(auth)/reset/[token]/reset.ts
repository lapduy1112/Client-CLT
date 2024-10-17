import axios from "axios";
import { BE_API_URL } from "@/libs/common/constants/api";
export function reset({
  password,
  token,
}: {
  password: string;
  token: string;
}) {
  return axios
    .post(`${BE_API_URL}/auth/reset-forgot-password/${token}`, {
      password,
    })
    .then((res) => res.data);
}
