import { useAuth } from "@/hooks/useAuth";
import { useProfilePicture } from "@/hooks/useProfilePicture";
import { Article } from "@/types/article";
import { User } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { RiEditBoxLine } from "react-icons/ri";
import ReactMarkdown from "react-markdown";

interface ArticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  article: Partial<Article>;
  user?: User;
}

export default function ArticleCard(props: ArticleCardProps) {
  const router = useRouter();
  const profilePicture = useProfilePicture(
    props.user ? props.user : props.article.author!
  );
  const authenticatedUser = useAuth();

  const cardOnClick = () => {
    router.push(`/view/${props.article.article_id}`);
  };
  const profileOnClick = () => {
    router.push(
      `/profile/${props.user?.user_id || props.article.author?.user_id}`
    );
  };

  const editOnClick = () => {
    router.push(`/edit/${props.article.article_id}`);
  };

  const isEditable = () => {
    const u = props.user ? props.user : props.article.author!;
    return u.user_id == authenticatedUser?.user_id;
  };

  return (
    <div
      {...props}
      className={`flex cursor-pointer flex-col rounded-md shadow-md hover:scale-[102%] ${props.className}`}
    >
      <Image
        onClick={cardOnClick}
        className="max-h-64 w-full rounded-md rounded-b-none"
        src="/article_default.jpg"
        alt=""
        width={3840}
        height={2160}
      />
      <div className="flex flex-grow flex-col p-4">
        <span onClick={cardOnClick} className="text-2xl">
          {props.article.title}
        </span>
        <div
          onClick={cardOnClick}
          className="text-md flex-grow text-gray-600 line-clamp-6"
        >
          <ReactMarkdown>{props.article.content || ""}</ReactMarkdown>
        </div>

        <div className="flex justify-between">
          <span
            onClick={profileOnClick}
            className="flex items-center gap-2 text-gray-600"
          >
            <Image
              className="aspect-square w-7 rounded-full border border-slate-100"
              src={profilePicture}
              alt=""
              width={500}
              height={500}
            />
            <span>
              {props.user?.username || props.article.author?.username}
            </span>
          </span>

          {isEditable() ? (
            <button
              onClick={editOnClick}
              className="flex items-center gap-2 rounded-md bg-slate-500 p-2 px-3 text-white shadow-md hover:bg-slate-800"
            >
              <RiEditBoxLine />
              Edit
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
