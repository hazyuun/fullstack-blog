import { articleService } from "@/services/article";

export const useArticleAPI = () => {
  const CreateEmpty = () => {
    return articleService.Create({
      title: "",
      content: "",
    });
  };

  const Create  = articleService.Create;
  const GetById = articleService.GetById;
  const GetAll  = articleService.GetAll;
  const Update  = articleService.Update;
  const Delete  = articleService.Delete;

  return { Create, CreateEmpty, GetAll, GetById, Update, Delete };
};
