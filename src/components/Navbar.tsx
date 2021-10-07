import { Button, capitalize } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useAuthContext } from "../lib/useAuthContext";
import { Page } from "../lib/types";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const pages = Object.values(Page);

  return (
    <div
      style={{
        background: "#eaaaaa",
        padding: "20px",
        width: "100%",
      }}
    >
      {pages.map((page) => (
        // <PageButton selected={location.pathname === page.route}>
        //   <Link to={page.route}>{page.title}</Link>
        // </PageButton>
        <button key={page} onClick={() => router.push(`/${page}`)}>
          {capitalize(page)}
        </button>
      ))}
      <Button onClick={logout} variant="contained">
        Log Out
      </Button>
    </div>
  );
};

export default Navbar;
