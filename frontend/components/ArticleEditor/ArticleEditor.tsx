import { Article } from "@/types/article";
import React, { useEffect, useState } from "react";
import {
  RiEditBoxLine,
  RiEye2Line,
  RiFileTextLine,
  RiSaveLine,
} from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import { FormInput } from "../Forms/FormInput";

interface ArticleEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  article: Partial<Article> | undefined;
  onSave: (article: Partial<Article>) => any;
}

export default function ArticleList(props: ArticleEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(props.article?.title!);
    setContent(props.article?.content!);
  }, [props.article]);

  const saveButtonOnClick = () => {
    props.onSave({ title, content });
  };

  const isEmpty = (str: string) => {
    return str?.match(/^( |\n|\t)*$/) !== null;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xl md:text-2xl">Article editor</span>
        <button
          onClick={saveButtonOnClick}
          disabled={isEmpty(title) || isEmpty(content)}
          className="flex items-center gap-2 rounded-md bg-teal-500 p-2 px-4 text-white shadow-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-slate-700"
        >
          <RiSaveLine />
          Save
        </button>
      </div>
      <FormInput
        value={title}
        onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        icon={<RiFileTextLine />}
        placeholder="Insert title here"
      />
      <div className="flex min-h-screen w-full flex-col gap-2 md:flex-row">
        <div className="flex w-1/2 flex-col rounded-md border-slate-200 shadow-md">
          <span className="flex items-center gap-2 rounded-t-md bg-slate-100 p-4">
            <RiEditBoxLine /> Edit
          </span>
          <textarea
            value={content}
            placeholder="Insert article content here..."
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow border border-slate-200 p-4 h-fit"
          ></textarea>
        </div>

        <div className="flex w-1/2 flex-col rounded-md border-slate-200 shadow-md">
          <span className="flex items-center gap-2 rounded-t-md bg-slate-100 p-4">
            <RiEye2Line /> Preview
          </span>
          {/* <div contentEditable className="flex-grow p-4 border border-slate-200">

          </div> */}
          <ReactMarkdown className="flex-grow whitespace-pre-line border border-slate-200 bg-slate-50 p-4">
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
