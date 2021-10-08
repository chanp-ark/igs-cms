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
    <Box>
      <Typography variant="h6">{label}</Typography>
      <Typography sx={{ width: "45%" }} variant="body1">
        {content}
        {children}
      </Typography>
    </Box>
  );
};

export default BoxTypography;
