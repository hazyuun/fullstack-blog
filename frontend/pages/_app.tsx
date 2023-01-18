import NavBar from "@/components/Navbar/Navbar";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const authenticatedUser = useAuth();

  return (
    <>
      <NavBar user={authenticatedUser} />
      <Component {...pageProps} />
    </>
  );
}
