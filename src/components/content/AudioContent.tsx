import { Button, Divider } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useHandleDelete } from "../../lib/hooks/useHandleDelete";
import { Audio } from "../../lib/types";
import BoxTypography from "./BoxTypography";
import ContentContainer from "./ContentContainer";

const AudioContent: React.FC<{ audio: Audio }> = ({ audio }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!audio) return;
    setTitle(audio.title);
    setDuration(audio.duration);
    setUrl(audio.url);
  }, [audio]);

  const handleEdit = () => router.push(router.asPath + "/edit");
  const handleDelete = useHandleDelete();

  return (
    <ContentContainer>
      <BoxTypography label="Title" content={title} />
      <Divider />
      <BoxTypography label="Duration" content={duration} />
      <Divider />
      <BoxTypography label="Audio" content={url} />
      <Button
        color="secondary"
        type="submit"
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

export default AudioContent;
