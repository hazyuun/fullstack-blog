import { useProfilePicture } from "@/hooks/useProfilePicture";
import { articleService } from "@/services/article";
import { Article } from "@/types/article";
import { DateTime } from "luxon";
import Head from "next/head";
import { useRouter } from "next/router";
import { RiTimeLine } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export async function getServerSideProps(context: any) {
  let article = null;
  try {
    const res = await articleService.GetById(context.params.article_id);
    article = res.data;
  } catch (e) {
    console.error(e);
  }
  return {
    props: { article },
  };
}
interface ArticleViewProps {
  article: Article;
}

export default function ArticleView(props: ArticleViewProps) {
  const photo = useProfilePicture(props.article.author);
  const router = useRouter();

  const profileOnClick = () => {
    router.push(`/profile/${props.article.author?.user_id}`);
  };

  return (
    <>
      <Head>
        <title>{props.article.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative flex h-64 w-full flex-col justify-center gap-4 overflow-hidden p-8 text-white sm:px-16">
          <Image
            className="absolute top-0 left-0 right-0 bottom-0 -z-10 h-full w-full object-cover brightness-50"
            src="/article_default.jpg"
            alt=""
            width={4096}
            height={3112}
          />

          <h1 className="text-xl md:text-4xl">{props.article.title}</h1>
          <span
            onClick={profileOnClick}
            className="flex cursor-pointer items-center gap-2"
          >
            <Image
              className="aspect-square w-7 rounded-full border border-slate-100 bg-white"
              src={photo}
              alt=""
              width={500}
              height={500}
            />
            <span>{props.article.author?.username}</span>
          </span>
          <span className="flex items-center gap-2">
            <RiTimeLine />
            {DateTime.fromISO(props.article.created_at)
              .toRelative()
              ?.toString()}{" "}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 xl:flex-row xl:items-start px-2 lg:px-32">
          <div className="flex flex-col gap-2 p-8 flex-grow text-slate-800 sm:p-16 lg:p-16 w-full xl:w-2/3">
            <ReactMarkdown>{props.article.content}</ReactMarkdown>
          </div>
          <div className="flex flex-col gap-2 p-8 text-slate-800 sm:p-16 lg:p-16 w-1/3 ">
            <span className="text-2xl">Suggested content</span>
            <hr />
            No suggestions
          </div>
        </div>
      </main>
    </>
  );
}
