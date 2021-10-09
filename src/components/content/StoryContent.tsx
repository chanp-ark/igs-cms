import { Button, Divider } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useHandleDelete } from "../../lib/hooks/useHandleDelete";
import { Story } from "../../lib/types";
import BoxTypography from "./BoxTypography";
import ContentContainer from "./ContentContainer";

const StoryContent: React.FC<{ story: Story }> = ({ story }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!story) return;
    setTitle(story.title);
    setImages(story.images);
  }, [story]);

  const handleEdit = () => router.push(router.asPath + "/edit");
  const handleDelete = useHandleDelete();

  return (
    <ContentContainer>
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
    </ContentContainer>
  );
};

export default StoryContent;
