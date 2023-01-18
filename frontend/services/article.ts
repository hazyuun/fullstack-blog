import { APIRoute } from "@/util/apiRoute";
import axios from "axios";

export interface ArticleCreateInput {
  title: string;
  content: string;
}

export interface ArticleUpdateInput {
  id: string;
  title: string;
  content: string;
}

export const articleService = {
  Create: (article: ArticleCreateInput) => {
    return axios.post(APIRoute("/article"), article, {
      withCredentials: true,
    });
  },

  GetById: (id: string) => {
    return axios.get(APIRoute(`/article/${id}`));
  },

  GetAll: () => {
    return axios.get(APIRoute(`/article/`));
  },

  Update: (article: ArticleUpdateInput) => {
    return axios.patch(
      APIRoute(`/article/${article.id}`),
      {
        title: article.title,
        content: article.content,
      },
      {
        withCredentials: true,
      }
    );
  },

  Delete: (id: string) => {
    return axios.delete(APIRoute(`/article/${id}`), {
      withCredentials: true,
    });
  },
};
