import type { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/Navbar";
import ProtectRoute from "../components/ProtectRoute";
import { AlertContextProvider } from "../lib/alertContext";
import { useAuthContext } from "../lib/hooks/useAuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = useAuthContext();

  return (
    <AlertContextProvider>
      <ProtectRoute>
        {user ? <Navbar /> : null}

        <Component {...pageProps} />
      </ProtectRoute>
    </AlertContextProvider>
  );
}
export default MyApp;
