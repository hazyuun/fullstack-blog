import { userService } from "@/services/user";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User>();

  useEffect(() => {
    userService
      .Me()
      .then((res) => {
        setAuthenticatedUser(res.data);
      })
      .catch(() => {});
  }, []);

  return authenticatedUser;
};
