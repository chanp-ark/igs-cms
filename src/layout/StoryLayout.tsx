import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Story } from "../lib/types";

interface StoryProps {
  story: Story;
}

const StoryLayout: React.FC<StoryProps> = ({ story }) => {
  const router = useRouter();
  return (
    <Box>
      <Typography>{story.title}</Typography>
      <Typography>{story.duration}</Typography>
      <Typography>{story.title}</Typography>
      <Typography>{story.title}</Typography>
      <Button onClick={() => router.push(router.asPath + "/edit")}>Edit</Button>
    </Box>
  );
};

export default StoryLayout;
