import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import Head from "next/head";
import { BASE_URL } from "../utils/config";

const CounterAnalytics = dynamic(
  () => import("../components/CounterAnalytics"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MagLit🔥 - Privacy Respecting Encrypted Link Shortener</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Encrypted & Privacy Respecting Magnet/HTTP(s) Link Shortener"
        />
        <meta property="og:title" content="MagLit🔥" />
        <meta
          property="og:description"
          content="A Free and Open Source Encrypted Privacy Respecting Magnet/HTTP(s) Link Shortener"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={BASE_URL + "og-image.jpg"} />
        <meta property="og:image" content={BASE_URL + "og-image.jpg"} />
        <meta name="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content="MagLit🔥 - Encrypted Private Link Shortener"
        />
        <meta
          property="twitter:description"
          content="A Free and Open Source Encrypted Privacy Respecting Magnet/HTTP(s) Link Shortener"
        />
        <meta property="twitter:url" content={BASE_URL} />
        <meta property="twitter:image" content={BASE_URL + "og-image.jpg"} />
        <meta name="theme-color" content="#fcd34d" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CounterAnalytics />
      <RecoilRoot>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
