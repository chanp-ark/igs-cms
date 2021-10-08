import { Button, MenuItem } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { getAllDocs } from "../lib/posts";
import { Page } from "../lib/types";

interface SidebarProps {
  page: Page;
}

const Sidebar: React.FC<SidebarProps> = ({ page }) => {
  const router = useRouter();
  const postId = router.query.id;
  const [postList, setPostList] = useState<DocumentData[]>([]);

  useEffect(() => {
    async function getDocs() {
      try {
        const docList = await getAllDocs(page);
        setPostList(docList);
      } catch (error) {
        console.error("Failed to get all docs", (error as any).message);
      }
    }
    getDocs();
  }, [page]);

  const styling = {
    display: "block",
    borderRight: "1px solid black",
    height: "min-content",
    justifyContent: "space-evenly",
    overflow: "auto",
    padding: "20px",
    width: "300px",
  };

  const posts = postList.map((li) => (
    <MenuItem
      divider={true}
      key={li.id}
      onClick={() => router.push(`/${page}/${li.id}`)}
      selected={li.id === postId}
      sx={{
        height: "100%",
        justifyContent: "space-evenly",
        overflow: "auto",
        padding: "20px",
        textAlign: "left",
        fontSize: "1.1rem",
      }}
    >
      {li.title}
    </MenuItem>
  ));

  return (
    <div style={styling}>
      <Button
        onClick={() => router.push(`/${page}/new`)}
        variant="outlined"
        sx={{
          overflow: "auto",
          padding: "20px",
          textAlign: "left",
          fontWeight: "bold",
          borderWidth: "2px",
          fontSize: "1rem",
          margin: "0 auto",
          width: "100%",
        }}
      >
        + New Post
      </Button>
      {posts}
    </div>
  );
};

export default Sidebar;