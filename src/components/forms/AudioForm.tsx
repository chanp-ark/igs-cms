import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useHandleSubmitPost } from "../../lib/hooks/useHandleSubmitPost";
import { Audio, Page } from "../../lib/types";
import FileInput from "./input/FileInput";
import TextInput from "./input/TextInput";

type AllOrNone<T> = T | { [K in keyof T]?: never };
type AudioFormProps = AllOrNone<{ postId: string; audio: Audio }>;

const AudioForm: React.FC<AudioFormProps> = ({ postId, audio }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (!audio) return;
    setTitle(audio.title);
    setDuration(audio.duration);
    setUrl(audio.url);
  }, [audio]);

  const handleFileChange = () => {
    const fileList = fileInputRef.current?.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
      setUrl(fileList[0].name);
    }
  };

  const { handleSubmitPost, isSubmitting } = useHandleSubmitPost(Page.AUDIO);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newAudio: Audio = {
      type: Page.AUDIO,
      title,
      duration,
      url,
    };
    handleSubmitPost(newAudio, postId, file);
  };

  const handleCancel = () =>
    router.push(postId ? router.asPath.replace("/edit", "") : `/${Page.AUDIO}`);

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
          name="duration"
          label="Duration"
          value={duration}
          setValue={setDuration}
        />
        <FileInput
          label="Audio"
          handleFileChange={handleFileChange}
          fileName={url}
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

export default AudioForm;
