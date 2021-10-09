import { Box, Typography } from "@mui/material";
import React from "react";

interface BoxTypographyProps {
  label: string;
  content?: string;
}

const BoxTypography: React.FC<BoxTypographyProps> = ({
  label,
  content,
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "1rem",
      }}
    >
      <Typography variant="h6" sx={{ flex: 1 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ flex: 2 }}>
        {content}
        {children}
      </Typography>
    </Box>
  );
};

export default BoxTypography;
