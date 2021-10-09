import { Box } from "@mui/material";
import React from "react";

const ContentContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
        margin: "1rem",
        padding: "2rem",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentContainer;
