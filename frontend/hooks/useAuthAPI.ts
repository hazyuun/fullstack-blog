import { authService } from "@/services/auth";

export const useAuthAPI = () => {
  const Login = authService.Login;
  const Logout = authService.Logout;

  return { Login, Logout };
};
