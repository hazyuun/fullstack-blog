import { useAuthAPI } from "@/hooks/useAuthAPI";
import { useProfilePicture } from "@/hooks/useProfilePicture";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  RiArrowDropDownFill,
  RiLogoutBoxFill,
  RiNewspaperFill,
  RiSettings2Fill,
  RiUser3Fill,
} from "react-icons/ri";
import Image from "next/image";

interface UserNavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export function UserNavItem(props: UserNavItemProps) {
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const profilePicture = useProfilePicture(props.user);
  const router = useRouter();
  const authAPI = useAuthAPI();

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  const profileOnClick = () => {
    router.push(`/profile/${props.user.user_id}`);
  };

  const settingsOnClick = () => {
    router.push(`/settings`);
  };

  const newArticleOnClick = () => {
    router.push(`/edit/new`).then(router.reload);
  };

  const logoutOnClick = () => {
    authAPI
      .Logout()
      .then(() => {
        router.push(`/`);
      })
      .then(router.reload)
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div
      {...props}
      onClick={() => toggleUserMenu()}
      className="group relative flex cursor-pointer items-center justify-around gap-4 rounded-md p-1 pr-2 pl-2 hover:bg-slate-100"
    >
      <Image
        className="h-8 w-8 rounded-full border-2 border-teal-500"
        src={profilePicture}
        alt=""
        width={32}
        height={32}
      />

      <span className="flex items-center gap-1 font-bold">
        {props.user.username}
        <RiArrowDropDownFill size="2rem" />
      </span>

      <div
        className={`${
          userMenuVisible ? "block" : "hidden"
        } absolute top-0 right-0 z-10 flex w-64 translate-y-10 flex-col gap-1 rounded-lg border border-slate-200 bg-white p-4 shadow-md`}
      >
        <a
          href="#"
          onClick={profileOnClick}
          className="flex items-center gap-4 rounded-md p-2 text-slate-700 no-underline hover:bg-slate-100"
        >
          <RiUser3Fill size="1.25rem" className="fill-slate-700" /> Profile
        </a>
        <a
          href="#"
          onClick={settingsOnClick}
          className="flex items-center gap-4 rounded-md p-2 text-slate-700 no-underline hover:bg-slate-100"
        >
          <RiSettings2Fill size="1.25rem" className="fill-slate-700" /> Settings
        </a>
        <hr />
        <a
          href="#"
          onClick={newArticleOnClick}
          className="flex items-center gap-4 rounded-md p-2 text-slate-700 no-underline hover:bg-slate-100"
        >
          <RiNewspaperFill size="1.25rem" className="fill-slate-700" /> New
          article
        </a>
        <hr />
        <a
          href="#"
          onClick={logoutOnClick}
          className="flex items-center gap-4 rounded-md p-2 text-slate-700 no-underline hover:bg-slate-100"
        >
          <RiLogoutBoxFill size="1.25rem" className="fill-slate-700" /> Log out
        </a>
      </div>
    </div>
  );
}
