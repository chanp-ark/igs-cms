import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useHandleSubmitPost } from "../../lib/hooks/useHandleSubmitPost";
import { Page, Story } from "../../lib/types";
import FileInput from "./input/FileInput";
import TextInput from "./input/TextInput";

type AllOrNone<T> = T | { [K in keyof T]?: never };
type StoryFormProps = AllOrNone<{ postId: string; story: Story }>;

const StoryForm: React.FC<StoryFormProps> = ({ postId, story }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>();

  useEffect(() => {
    if (!story) return;
    setTitle(story.title);
    setImages(story.images);
  }, [story]);

  const handleFileChange = () => {
    const fileList = fileInputRef.current?.files;
    if (fileList && fileList.length > 0) {
      const fileArray = Array.from(fileList);
      setFiles(fileArray);
      setImages(fileArray.map((file) => file.name));
    }
  };

  const { handleSubmitPost, isSubmitting } = useHandleSubmitPost(Page.STORIES);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newStory: Story = {
      type: Page.STORIES,
      title,
      images,
    };
    handleSubmitPost(newStory, postId, files);
  };

  const handleCancel = () =>
    router.push(
      postId ? router.asPath.replace("/edit", "") : `/${Page.STORIES}`
    );
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
      <form onSubmit={handleSubmit}>
        <TextInput
          name="title"
          label="Title"
          value={title}
          setValue={setTitle}
        />
        <FileInput
          label="Image"
          handleFileChange={handleFileChange}
          fileName={images.join("\n")}
          ref={fileInputRef}
          multiple
        />
        <Box sx={{ display: "flex", width: "25%" }}>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            sx={{ marginTop: "3rem", marginLeft: "0.5rem", width: "10%" }}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            color="secondary"
            variant="contained"
            sx={{ marginTop: "3rem", marginLeft: "1rem" }}
          >
            Cancel
          </Button>
        </Box>
      </form>
      {isSubmitting && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            bgcolor: "black",
            opacity: "70%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default StoryForm;
