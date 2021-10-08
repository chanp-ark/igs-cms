import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Article = ({ article }) => {
  const [title, setTitle] = useState(article.title);
  const [subtitle, setSubtitle] = useState(article.subtitle);
  const [body, setBody] = useState(article.html);
  const [image, setImage] = useState(article.thumbnail);

  console.log(body)

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
      <Box sx={{display: 'flex'}}>
        <Typography variant="h6" shrink={false}>
          Title
        </Typography>
        <Typography
          sx={{ width: "45%" }}
          variant="body1"
        >
        {title}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{display: 'flex', alignItems: 'center'}}>        
        <Typography variant="h6">
          Subtitle
        </Typography>

        <Typography
          sx={{ width: "45%" }}
          variant="body1"
        >
        {subtitle}
        </Typography>
      </Box>
      
      <Divider />

      <Box sx={{display: 'flex'}} >
        <Typography variant="h6">
          Body
        </Typography>
        <Typography
          sx={{ width: "45%" }}
        />
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
        <Typography variant="h6">
          Image
        </Typography>

        {image ? (
          <Typography variant="body2">
            {image}
          </Typography>
        ) : null}
      </Box>

      <Button
        color="secondary"
        type="submit"
        variant="contained"
        sx={{ marginTop: "3rem", marginLeft: "0.5rem" }}
      >
        Edit
      </Button>
    </form>
    </Box>
  );
};

export default Article;
