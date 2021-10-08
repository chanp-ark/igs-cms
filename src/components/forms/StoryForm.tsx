import {
  Button,
  FormControl,
  Input,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Article, Story } from "../../lib/types";

interface StoryProps {
  story?: Story;
}

const StoryForm: React.FC<StoryProps> = ({ story }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<any[]>([]);

  const handleSubmit = () => {};

  return (
    <form style={{ width: "600px" }} onSubmit={handleSubmit}>
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
          sx={{ width: "45%" }}
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
          onChange={(e) => setImages([...images, e.target.value])}
          type="file"
          sx={{ width: "45%" }}
        />
        {/* Map images here */}
        {/* {images ? (
          <Typography variant="subtitle2" sx={{ width: "300px" }}>
            {image}
          </Typography>
        ) : null} */}
      </FormControl>
      <Button
        color="primary"
        type="submit"
        variant="contained"
        sx={{ marginTop: "3rem", marginLeft: "0.5rem" }}
      >
        Submit
      </Button>
      <Button
        onClick={() => router.push(router.asPath.replace("/edit", ""))}
        color="primary"
        variant="contained"
        sx={{ marginTop: "3rem", marginLeft: "0.5rem" }}
      >
        Cancel
      </Button>
    </form>
  );
};

export default StoryForm;
