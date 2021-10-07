import type { AppProps } from "next/app";
import React from "react";
import ProtectRoute from "../components/ProtectRoute";
import { AlertContextProvider } from "../lib/alertContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertContextProvider>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
    </AlertContextProvider>
  );
}
export default MyApp;
