import { AppBar, Box, Button, capitalize, IconButton, Toolbar, Typography, Tabs, Tab} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useAuthContext } from "../lib/useAuthContext";
import { Page } from "../lib/types";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const pages = Object.values(Page);
  const [activeTab, setActiveTab] = useState('')

  const handleClick = (selectedTab: string) => {
    setActiveTab(selectedTab)
    router.push(`/${selectedTab}`)
  }

  return (
    <Box
      style={{
        background: "#eaaaaa",
        padding: "20px",
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={activeTab}
      >
        {pages.map((page) => {
            return (
              <Tab key={page} label={capitalize(page)} value={page} onClick={() => handleClick(page)} sx={{margin: '0 1rem'}}/>
            );
          })}
      </Tabs>
      <Button onClick={logout} variant="contained">
          Log Out
      </Button>
    </Box>
  );
};

export default Navbar;
