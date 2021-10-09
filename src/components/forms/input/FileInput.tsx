import { Button, FormControl, InputLabel, Typography } from "@mui/material";
import React from "react";

interface FileInputProps {
  label: string;
  handleFileChange: () => void;
  fileName?: string;
  multiple?: boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, handleFileChange, fileName, multiple }, ref) => {
    return (
      <FormControl
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <InputLabel shrink={false} htmlFor={"container-file-button"}>
          {label}
        </InputLabel>
        <input
          id="container-file-button"
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          ref={ref}
          style={{ display: "none" }}
        />
        <label htmlFor="container-file-button">
          <Button variant="contained" color="primary" sx={{marginTop:'1rem'}} component="span">
            {"Choose File"}
          </Button>
        </label>
        { fileName
          ? <Typography variant="body2" sx={{marginTop:'1rem'}}>
            {fileName}
          </Typography>
          : null
        }
      </FormControl>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
