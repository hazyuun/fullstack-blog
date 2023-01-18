import { Article } from "./article";

export interface User {
  user_id: string;
  username: string;
  photo: string;
  bio: string;
  joinedAt: string;
  articles: Array<Article>;
}
