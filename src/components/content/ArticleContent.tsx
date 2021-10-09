import { Button, Divider } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { deletePost } from "../../lib/posts";
import { Article, Page } from "../../lib/types";
import BoxTypography from "./BoxTypography";
import ContentContainer from "./ContentContainer";

const ArticleContent: React.FC<{ article: Article }> = ({ article }) => {
  const router = useRouter();
  const page = router.query.page as Page;
  const postId = router.query.id as string;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (!article) return;
    setTitle(article.title);
    setSubtitle(article.subtitle);
    setDuration(article.duration);
    setBody(article.html);
    setImage(article.thumbnail);
  }, [article]);

  const handleEdit = () => router.push(router.asPath + "/edit");
  const handleDelete = () => {
    deletePost(page, postId);
    router.push(`/${page}`);
  };

  return (
    <ContentContainer>
      <BoxTypography label="Title" content={title} />
      <Divider />
      <BoxTypography label="Subtitle" content={subtitle} />
      <Divider />
      <BoxTypography label="Duration" content={duration} />
      <Divider />
      <BoxTypography label="Body">
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </BoxTypography>
      <Divider />
      <BoxTypography label="Image" content={image} />
      <Button
        color="secondary"
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

export default ArticleContent;
