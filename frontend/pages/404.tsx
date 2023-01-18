import Head from "next/head";
import Link from "next/link";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Blog | 404 Not found</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex h-screen flex-col items-center justify-center gap-5 p-4 text-slate-800 lg:p-16">
          <div className="text-4xl">404</div>
          <p className="text-lg">Page not found</p>
          <Link href="/">Return to home</Link>
        </div>
      </main>
    </>
  );
}
