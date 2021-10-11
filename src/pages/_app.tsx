import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import ConditionalWrap from "../components/ConditionalWrap";
import Navbar from "../components/Navbar";
import PageLayout from "../components/PageLayout";
import ProtectRoute from "../components/ProtectRoute";
import { AlertContextProvider } from "../lib/alertContext";
import { DataContextProvider } from "../lib/dataContext";
import { useAuthContext } from "../lib/hooks/useAuthContext";
import { Page } from "../lib/types";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = useAuthContext();
  const router = useRouter();
  const page = router.query.page as Page;

  return (
    <DataContextProvider>
      <AlertContextProvider>
        <ProtectRoute>
          {user ? <Navbar /> : null}
          <ConditionalWrap
            condition={Boolean(page)}
            wrap={(children) => <PageLayout>{children}</PageLayout>}
          >
            <Component {...pageProps} />
          </ConditionalWrap>
        </ProtectRoute>
      </AlertContextProvider>
    </DataContextProvider>
  );
}
export default MyApp;
