import { userService } from "@/services/user";

export const useUserAPI = () => {
  const Register = userService.Register;
  const Me = userService.Me;
  const GetById = userService.GetById;
  const GetAll = userService.GetAll;
  const Update = userService.Update;
  const Delete = userService.Delete;

  return { Register, Me, GetById, GetAll, Update, Delete };
};
