import { Box, Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useAlertContext } from "../../lib/alertContext";
import { createPost, updatePost } from "../../lib/posts";
import { Page, Story } from "../../lib/types";
import FileInput from "./input/FileInput";
import TextInput from "./input/TextInput";

type AllOrNone<T> = T | { [K in keyof T]?: never };
type StoryFormProps = AllOrNone<{ postId: string; story: Story }>;

const StoryForm: React.FC<StoryFormProps> = ({ postId, story }) => {
  const router = useRouter();
  const { setAlert } = useAlertContext();
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newStory: Story = {
      type: Page.STORIES,
      title,
      images,
    };

    const formFilled =
      Object.values(newStory).every((entry) => entry !== "") && files;

    if (!formFilled) {
      setAlert("Empty form, please fill in all fields");
      return;
    }

    if (postId && story) {
      updatePost(postId, Page.STORIES, newStory, files);
      setAlert("Post updated!");
    } else {
      const postId = await createPost(Page.STORIES, newStory, files);
      setAlert("Post successful!");
      router.push(`/${Page.STORIES}/${postId}`);
    }
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
    </Box>
  );
};

export default StoryForm;
