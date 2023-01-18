import Link from "next/link";
import React from "react";

interface NavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href: string;
  active?: boolean;
}

export default function NavItem(props: NavItemProps) {
  return (
    <Link
      className="flex items-center text-slate-600 no-underline"
      href={props.href}
    >
      <li
        {...props}
        className={`flex list-none items-center gap-1 p-1 px-2 hover:rounded-md hover:bg-slate-200 hover:shadow-md ${
          props.active ? "border-b-2 border-teal-600 hover:rounded-b-none" : ""
        } ${props.className}`}
      >
        {props.children}
      </li>
    </Link>
  );
}
