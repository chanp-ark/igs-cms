import { Box, Button, Divider } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { deletePost } from "../../lib/posts";
import { Page, Story } from "../../lib/types";
import BoxTypography from "./BoxTypography";

const StoryLayout: React.FC<{ story: Story }> = ({ story }) => {
  const router = useRouter();
  const page = router.query.page as Page;
  const postId = router.query.id as string;

  const [title, setTitle] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!story) return;
    setTitle(story.title);
    setImages(story.images);
  }, [story]);

  const handleEdit = () => router.push(router.asPath + "/edit");
  const handleDelete = () => {
    deletePost(page, postId);
    router.push(`/${page}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
        margin: "1rem",
        padding: "2rem 1rem",
      }}
    >
      <div>
        <BoxTypography label="Title" content={title} />
        <Divider />
        <BoxTypography label="Image" content={images?.join("\n")} />
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          sx={{ marginTop: "3rem", marginLeft: "0.5rem" }}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          color="error"
          variant="contained"
          sx={{ marginTop: "3rem", marginLeft: "0.5rem" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Box>
  );
};

export default StoryLayout;
