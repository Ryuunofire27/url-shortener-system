import Loader from "@/components/ui/loader";
import { LoadingContext } from "@/contexts/loading/loading.context";
import { LoadingProvider } from "@/contexts/loading/loading.provider";
import { UserProvider } from "@/contexts/user/user.provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useContext } from "react";

function IntoProviders(){
  const { isLoading } = useContext(LoadingContext);
  return <Loader open={isLoading}/>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <UserProvider>
        <IntoProviders />
        <Component {...pageProps} />
      </UserProvider>
    </LoadingProvider>
  );
}
