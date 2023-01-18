import { API_URI } from "@/config/config";

export const APIRoute = (route: string) => {
  return API_URI + route;
};
