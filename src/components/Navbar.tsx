import { Box, Button, capitalize, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useAuthContext } from "../lib/hooks/useAuthContext";
import { Page } from "../lib/types";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const pages = Object.values(Page);

  const handleClick = (selectedTab: string) => {
    router.push(`/${selectedTab}`);
  };

  return (
    <Box
      style={{
        background: "#eaaaaa",
        padding: "20px",
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={router.asPath.split("/")[1]}
      >
        {pages.map((page) => (
          <Tab
            key={page}
            label={capitalize(page)}
            value={page}
            onClick={() => handleClick(page)}
            sx={{ margin: "0 1rem" }}
          />
        ))}
      </Tabs>
      <Button onClick={logout} variant="contained">
        Log Out
      </Button>
    </Box>
  );
};

export default Navbar;
