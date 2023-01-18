import LoginForm from "@/components/Forms/LoginForm";
import { redirectIfAuthenticated } from "@/util/redirectIfAuthenticated";
import Head from "next/head";
import { useRouter } from "next/router";

export const getServerSideProps = redirectIfAuthenticated;

export default function Login() {
  const router = useRouter();

  const onLoginSuccess = () => {
    router.push("/").then(router.reload);
  };

  return (
    <>
      <Head>
        <title>Blog | Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative flex h-screen w-full flex-col justify-center gap-4 p-8 px-16 md:items-center">
          <LoginForm
            onLoginSuccess={onLoginSuccess}
            className="md:w-1/2 lg:w-96"
          />
        </div>
      </main>
    </>
  );
}
