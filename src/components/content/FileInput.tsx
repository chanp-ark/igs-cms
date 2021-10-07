import { FormControl, Input, InputLabel } from "@mui/material";
import React from "react";
import { ContentProps } from "./ContentProps";

const FileInput: React.FC<ContentProps> = ({ fieldName, labelName, value }) => {
  return (
    <FormControl
      key={labelName}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <InputLabel htmlFor={labelName} shrink={false} required>
        {labelName}
      </InputLabel>
      <Input
        name={fieldName[0]}
        // onChange={(e) =>
        //   setFormData(() => ({
        //     ...formData,
        //     // @ts-ignore
        //     [fieldName[0]]: e.target.files[0],
        //   }))
        // }
        type="file"
        sx={{ width: "45%" }}
      />
      <p>{value}</p>
    </FormControl>
  );
};

export default FileInput;
