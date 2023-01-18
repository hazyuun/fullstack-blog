import { user, article } from "@prisma/client";
import underscore from "underscore";

export const filterUser = (u: user) => {
  const safeFields = [
    "user_id",
    "username",
    "bio",
    "photo",
    "joined_at",
    "articles",
  ];

  return underscore.pick(u, safeFields);
};

export const filterUsers = (users: Array<user>) => {
  return users.map((u) => {
    return filterUser(u);
  });
};

export const filterArticle = (a: article | any) => {
  const result = {
    ...a,
    author: filterUser(a.author),
  };

  return result;
};

export const filterArticles = (users: Array<article>) => {
  return users.map((u) => {
    return filterArticle(u);
  });
};
