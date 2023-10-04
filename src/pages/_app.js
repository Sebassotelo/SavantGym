import "@/styles/globals.css";
import Context from "@/servicios/context";
import Layout from "@/componentes/layout/Layout";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <Context>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </Context>
  );
}
