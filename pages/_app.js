import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import Head from "next/head";
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
        <title>Mag🔥Lit - Encrypted Private Link Shortener</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Encrypted & Privacy Respecting Magnet/HTTP(s) Link Shortener"
        />
        <meta property="og:title" content="Mag🔥Lit" />
        <meta
          property="og:description"
          content="A Free and Open Source Encrypted Privacy Respecting Magnet/HTTP(s) Link Shortener"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:url" content="https://maglit.ml/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://maglit.ml/og-image.png" />
        <meta property="og:image" content="https://maglit.ml/og-image.png" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content="Mag🔥Lit - Encrypted Private Link Shortener"
        />
        <meta
          property="twitter:description"
          content="A Free and Open Source Encrypted Privacy Respecting Magnet/HTTP(s) Link Shortener"
        />
        <meta property="twitter:url" content="https://maglit.ml/" />
        <meta
          property="twitter:image"
          content="https://maglit.ml/twitter-image.png"
        />
        <meta name="theme-color" content="#fcd34d" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CounterAnalytics />
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
