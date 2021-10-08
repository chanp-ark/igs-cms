import { useRouter } from "next/dist/client/router";
import React from "react";
import { useAuthContext } from "../lib/hooks/useAuthContext";

const ProtectRoute: React.FC = ({ children }) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user && router.pathname !== "/login") {
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectRoute;
