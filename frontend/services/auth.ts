import { APIRoute } from "@/util/apiRoute";
import axios from "axios";
import qs from "qs";

export interface LoginInput {
  username: string;
  password: string;
}

export const authService = {
  Login: (user: LoginInput) => {
    return axios.post(APIRoute("/auth/login"), qs.stringify(user), {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    });
  },

  Logout: () => {
    return axios.post(APIRoute("/auth/logout"), "", {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    });
  },
};
