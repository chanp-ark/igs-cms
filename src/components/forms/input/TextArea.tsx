import { FormControl, InputLabel, TextareaAutosize } from "@mui/material";
import React from "react";
import { TextInputProps } from "./TextInput";

const TextArea: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  setValue,
}) => {
  return (
    <FormControl>
      <InputLabel shrink={false} htmlFor={name}>
        {label}
      </InputLabel>
      <TextareaAutosize
        aria-label="body"
        style={{ width: "50%", marginLeft: "18rem" }}
        minRows={5}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
};

export default TextArea;
