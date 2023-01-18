import ArticleList from "@/components/ArticleList/ArticleList";
import { useProfilePicture } from "@/hooks/useProfilePicture";
import { userService } from "@/services/user";
import { User } from "@/types/user";
import Head from "next/head";
import { RiForbidLine } from "react-icons/ri";
import Image from "next/image";

export async function getServerSideProps(context: any) {
  let user = null;
  try {
    const res = await userService.GetById(context.params.user_id);
    user = res.data;
  } catch (e) {
    console.error(e);
  }

  return {
    props: { user },
  };
}

interface ProfileProps {
  user: User;
}

export default function Profile(props: ProfileProps) {
  const photo = useProfilePicture(props.user);

  return (
    <>
      <Head>
        <title>{props.user.username}&apos;s Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="h-40 bg-slate-800"></div>
        <div className="relative flex w-full -translate-y-24 flex-col justify-center gap-4 overflow-hidden p-8 md:px-16">
          <div className="flex flex-col items-center gap-8">
            <Image
              className="aspect-square w-32 rounded-full border border-slate-300 bg-white"
              src={photo}
              alt=""
            />
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl">{props.user?.username}</span>
              <p className="text-slate-500">{props.user?.bio}</p>
              <span className="text-md flex gap-4">
                <span>
                  <b>0</b> following
                </span>
                <span>
                  <b>0</b> followers
                </span>
                <span>
                  <b>{props.user?.articles.length}</b> articles
                </span>
              </span>
            </div>
          </div>
          <span className="flex items-center gap-4 p-4 text-lg">
            <hr className="flex-grow" />
            Articles
            <hr className="flex-grow" />
          </span>

          {
            props.user.articles.length == 0 ? (
              <span className="flex items-center justify-center gap-2 text-gray-500">
                {" "}
                <RiForbidLine /> No articles{" "}
              </span>
            ) : (
              <ArticleList
                user={props.user}
                articles={props.user.articles}
                onLoadMore={() => {}}
              />
            )
            // </div>
          }
        </div>
      </main>
    </>
  );
}
