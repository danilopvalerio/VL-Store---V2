import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/css/general.css";
import Head from "next/head";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Adicione o Bootstrap JS */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
