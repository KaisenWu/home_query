import "@/styles/globals.css";
import Head from "next/head";
// Import session provider.
import { Provider } from "next-auth/client";
// Import Layout (includes navigation bar).
import Layout from "../../components/layout/layout";
// Import notification context.
import { NotificationContextProvider } from "../../store/notification-context";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>Home Query</title>
            <meta name="description" content="Home Query Project" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </Provider>
  );
}
