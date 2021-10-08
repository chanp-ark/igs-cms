import { Box, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Article } from "../lib/types";

const ArticleLayout: React.FC<{ article: Article }> = ({ article }) => {
  const router = useRouter();

  const [title, setTitle] = useState(article.title);
  const [subtitle, setSubtitle] = useState(article.subtitle);
  const [duration, setDuration] = useState(article.duration);
  const [body, setBody] = useState(article.body);
  const [image, setImage] = useState(article.image);

  useEffect(() => {
    setTitle(article.title);
    setSubtitle(article.subtitle);
    setDuration(article.duration);
    setBody(article.body);
    setImage(article.image);
  }, [article]);

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
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6">Title</Typography>
          <Typography sx={{ width: "45%" }} variant="body1">
            {title}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Subtitle</Typography>

          <Typography sx={{ width: "45%" }} variant="body1">
            {subtitle}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Duration</Typography>

          <Typography sx={{ width: "45%" }} variant="body1">
            {duration}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex" }}>
          <Typography variant="h6">Body</Typography>
          <Typography sx={{ width: "45%" }} variant="body2">
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </Typography>
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Typography variant="h6">Image</Typography>

          {image ? <Typography variant="body2">{image}</Typography> : null}
        </Box>

        <Button
          color="secondary"
          type="submit"
          variant="contained"
          sx={{ marginTop: "3rem", marginLeft: "0.5rem" }}
          onClick={() => router.push(router.asPath + "/edit")}
        >
          Edit
        </Button>
      </div>
    </Box>
  );
};

export default ArticleLayout;
