import { User } from "@/types/user";
import { APIRoute } from "@/util/apiRoute";
import axios from "axios";

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface UserUpdateInput extends Partial<User> {}

export const userService = {
  Register: (user: RegisterInput) => {
    return axios.post(APIRoute("/user"), user);
  },

  Me: (extraHeaders?: any) => {
    return axios.get(APIRoute("/user/me"), {
      withCredentials: true,
      headers: {
        extraHeaders
      }
    });
  },

  GetById: (id: string) => {
    return axios.get(APIRoute(`/user/${id}?include_articles=true`));
  },

  GetAll: () => {
    return axios.get(APIRoute(`/user/`));
  },

  Update: (user: UserUpdateInput) => {
    return axios.patch(APIRoute(`/user/`), user, {
      withCredentials: true,
    });
  },

  Delete: () => {
    return axios.delete(APIRoute(`/user/`), {
      withCredentials: true,
    });
  },
};
