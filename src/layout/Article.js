import {
  Button,
  FormControl,
  Input,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Article = ({ article }) => {
  const [title, setTitle] = useState(article.title);
  const [subtitle, setSubtitle] = useState(article.subtitle);
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = () => {};
  const submitButtonText = "Post";

  return (
    <form style={{ width: "600px" }} onSubmit={handleSubmit}>
      <>
        <Typography htmlFor={"title"} shrink={false}>
          Title
        </Typography>
        <Typography
          sx={{ width: "45%" }}
        >
        {title}
        </Typography>
      </>
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
          value={title}
          sx={{ width: "45%" }}
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
          style={{ width: "270px" }}
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
          <Typography variant="subtitle2" sx={{ width: "300px" }}>
            {image}
          </Typography>
        ) : null}
      </FormControl>
      <Button
        color="primary"
        type="submit"
        variant="contained"
        sx={{ marginTop: "3rem", marginLeft: "0.5rem" }}
      >
        {submitButtonText}
      </Button>
    </form>
  );
};

export default Article;