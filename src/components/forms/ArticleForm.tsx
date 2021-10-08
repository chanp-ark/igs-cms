import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Article } from "../../lib/types";

interface ArticleProps {
  article: Article;
}

const ArticleForm: React.FC<ArticleProps> = ({ article }) => {
  const [title, setTitle] = useState(article.title);
  const [subtitle, setSubtitle] = useState(article.subtitle);
  const [body, setBody] = useState(article.html);
  const [image, setImage] = useState(article.thumbnail);
  const [duration, setDuration] = useState(article.duration);

  const handleSubmit = () => {};

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
      <FormControl>
        <InputLabel htmlFor={"title"} shrink={false}>
          Title
        </InputLabel>
        <Input
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          value={title}
        />
      </FormControl>

      <FormControl>
        {/* <FormControl classes={"input-field"}> */}
        <InputLabel htmlFor={"subtitle"} shrink={false}>
          Subtitle
        </InputLabel>
        <Input
          name="subtitle"
          onChange={(e) => setSubtitle(e.target.value)}
          type="text"
          placeholder="Subtitle"
          value={subtitle}
        />
      </FormControl>
  
      <FormControl>
        <InputLabel htmlFor={"duration"} shrink={false}>
          Duration
        </InputLabel>
        <Input
          name="duration"
          onChange={(e) => setDuration(e.target.value)}
          type="text"
          placeholder="ex: 3-4 minute read"
          value={duration}
        />
      </FormControl>

      <FormControl>
        <InputLabel shrink={false} htmlFor={"subtitle"}>
          Body
        </InputLabel>
        <TextareaAutosize
          aria-label="body"
          minRows={5}
          name="body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          style={{ width: '50%', marginLeft: '18rem'}}
        />
      </FormControl>

      <FormControl
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <InputLabel htmlFor="image" shrink={false}>
          Image
        </InputLabel>
        <Input
          name="image"
          onChange={(e) => setImage(e.target.value)}
          type="file"
          sx={{ width: "45%" }}
        />
        {image ? (
          <Typography variant="subtitle2" sx={{ width: "50%", marginLeft: '18rem' }}>
            {image}
          </Typography>
        ) : null}
      </FormControl>
      <Button
        color="primary"
        type="submit"
        variant="contained"
        sx={{ marginTop: "3rem", marginLeft: "0.5rem", width: '10%' }}
      >
        Save
      </Button>
    </form>
    </Box>
  );
};

export default ArticleForm;
