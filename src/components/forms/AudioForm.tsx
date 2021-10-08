import {
  Button,
  FormControl,
  Input,
  InputLabel
} from "@mui/material";
import React, { useState } from "react";
import { Audio } from "../../lib/types";

interface AudioProps {
  audio?: Audio;
}

const AudioForm: React.FC<AudioProps> = ({ audio }) => {
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
    </form>
  );
};

export default AudioForm;