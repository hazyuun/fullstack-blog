import { userService } from "@/services/user";
import { AxiosError } from "axios";

export async function redirectIfAuthenticated(context: any) {
  /* Redirect to root if a user is logged in  */
  const redirection = {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };

  try {
    const cookies = context.req.headers.cookie;
    const res = await userService.Me({
      Cookie: cookies,
    });

    if (res.status == 200) {
      return redirection;
    }
  } catch (err) {
    const e = err as AxiosError;

    if (e.response!.status == 401) {
      return { props: {} };
    }

    return redirection;
  }
}
