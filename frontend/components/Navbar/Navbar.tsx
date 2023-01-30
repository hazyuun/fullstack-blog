import { User } from "@/types/user";
import Link from "next/link";
import { RiHome4Fill, RiInformationFill, RiLayout4Fill } from "react-icons/ri";
import NavItem from "./NavItem";
import { UserNavItem } from "./UserNavItem";

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User;
}

export default function NavBar(props: NavBarProps) {
  return (
    <nav
      {...props}
      className="flex h-14 w-full items-center justify-around shadow-sm lg:px-32 xl:px-64"
    >
      <Link className="px-8 text-slate-800 no-underline" href="/">
        Blog
      </Link>

      <div className="flex flex-grow justify-end gap-2 sm:gap-8 ">
        <ul className="flex gap-0 sm:gap-2">
          <NavItem className="p-2 px-3 sm:p-1 sm:px-2" href="/" active>
            <RiHome4Fill />
            <span className="hidden sm:flex">Home</span>
          </NavItem>
          <NavItem className="p-2 px-3 sm:p-1 sm:px-2" href="/products">
            <RiLayout4Fill />
            <span className="hidden sm:flex">Products</span>
          </NavItem>
          <NavItem className="p-2 px-3 sm:p-1 sm:px-2" href="/about">
            <RiInformationFill />
            <span className="hidden sm:flex">About</span>
          </NavItem>
        </ul>

        {props.user ? (
          <UserNavItem user={props.user} />
        ) : (
          <ul className="flex gap-2 mr-2 sm:mr-0 sm:px-8 md:px-0">
            <NavItem
              className="rounded-md border border-teal-500"
              href="/register"
            >
              Register
            </NavItem>
            <NavItem
              className="rounded-md border border-teal-500 bg-teal-500 text-white"
              href="/login"
            >
              Login
            </NavItem>
          </ul>
        )}
      </div>
    </nav>
  );
}
