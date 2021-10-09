import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useHandleSubmitPost } from "../../lib/hooks/useHandleSubmitPost";
import { Article, Page } from "../../lib/types";
import FileInput from "./input/FileInput";
import TextArea from "./input/TextArea";
import TextInput from "./input/TextInput";

type AllOrNone<T> = T | { [K in keyof T]?: never };
type ArticleFormProps = AllOrNone<{ postId: string; article: Article }>;

const ArticleForm: React.FC<ArticleFormProps> = ({ postId, article }) => {
  const router = useRouter();
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

  const { handleSubmitPost, isSubmitting } = useHandleSubmitPost(Page.ARTICLES);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newArticle: Article = {
      type: Page.ARTICLES,
      title,
      subtitle,
      duration,
      html,
      thumbnail,
    };
    handleSubmitPost(newArticle, postId, file);
  };

  const handleCancel = () =>
    router.push(
      postId ? router.asPath.replace("/edit", "") : `/${Page.ARTICLES}`
    );

  return (
    <Box
      sx={{
        position: "relative",
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

export default ArticleForm;
