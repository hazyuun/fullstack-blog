import { User } from "./user";

export interface Article {
  article_id: string;
  author: Partial<User>;
  title: string;
  content: string;
  image: string;
  created_at: string;
}
