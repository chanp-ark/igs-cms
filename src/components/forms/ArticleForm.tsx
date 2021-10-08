import { Box, Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useAlertContext } from "../../lib/alertContext";
import { createPost, updatePost } from "../../lib/posts";
import { Article, Page } from "../../lib/types";
import FileInput from "./input/FileInput";
import TextArea from "./input/TextArea";
import TextInput from "./input/TextInput";

type AllOrNone<T> = T | { [K in keyof T]?: never };
type ArticleFormProps = AllOrNone<{ postId: string; article: Article }>;

const ArticleForm: React.FC<ArticleFormProps> = ({ postId, article }) => {
  const router = useRouter();
  const { setAlert } = useAlertContext();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [duration, setDuration] = useState("");
  const [html, setHtml] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (!article) return;
    setTitle(article.title);
    setSubtitle(article.subtitle);
    setDuration(article.duration);
    setHtml(article.html);
    setThumbnail(article.thumbnail);
  }, [article]);

  const handleFileChange = () => {
    const fileList = fileInputRef.current?.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
      setThumbnail(fileList[0].name);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newArticle: Article = {
      type: Page.ARTICLES,
      title,
      subtitle,
      duration,
      html,
      thumbnail,
    };
    console.log(newArticle);

    const formFilled = Object.values(newArticle).every((entry) => entry !== "");
    if (!formFilled) {
      setAlert("Empty form, please fill in all fields");
      return;
    }

    if (postId && article) {
      updatePost(postId, Page.ARTICLES, newArticle);
      setAlert("Post updated!");
      router.push(`/${Page.ARTICLES}/${postId}`);
    } else {
      if (!file) {
        alert("No file?");
        return;
      }
      const newPostId = await createPost(Page.ARTICLES, newArticle, file);
      setAlert("Post successful!");
      router.push(`/${Page.ARTICLES}/${newPostId}`);
    }
  };

  const handleCancel = () =>
    router.push(
      postId ? router.asPath.replace("/edit", "") : `/${Page.ARTICLES}`
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
        <TextInput
          name="subtitle"
          label="Subtitle"
          value={subtitle}
          setValue={setSubtitle}
        />
        <TextInput
          name="duration"
          label="Duration"
          value={duration}
          setValue={setDuration}
        />
        <TextArea name="html" label="Body" value={html} setValue={setHtml} />
        <FileInput
          label="Image"
          handleFileChange={handleFileChange}
          fileName={thumbnail}
          ref={fileInputRef}
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

export default ArticleForm;
