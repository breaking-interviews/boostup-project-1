import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="flex flex-col max-h-full justify-center items-center bg-bgColor">
            <Header />
            <Component {...pageProps} />
            <Footer />
            <Navbar />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
