import { Article } from "@/types/article";
import { User } from "@/types/user";
import React, { MouseEventHandler } from "react";
import { RiArrowDownLine } from "react-icons/ri";
import ArticleCard from "./ArticleCard";

interface ArticleListProps extends React.HTMLAttributes<HTMLDivElement> {
  articles: Array<Partial<Article>> | undefined;
  user?: User;
  onLoadMore: MouseEventHandler<HTMLButtonElement>;
}

export default function ArticleList(props: ArticleListProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {props.articles?.map((a, i) => {
          return (
            <ArticleCard
              key={i}
              user={props.user}
              article={a}
              className={`${i % 5 == 0 ? "sm:col-span-2" : "col-span-1"}`}
            />
          );
        })}
      </div>
      <button
        onClick={props.onLoadMore}
        className="mx-auto flex items-center gap-1 rounded-md border border-slate-100 p-3 px-4 shadow-md hover:bg-slate-200"
      >
        <RiArrowDownLine /> Load more
      </button>
    </div>
  );
}
