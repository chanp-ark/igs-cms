import { FormControl, InputLabel, TextareaAutosize } from "@mui/material";
import React from "react";
import { TextInputProps } from "./TextInput";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const TextArea: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  setValue,
}) => {
  const { useQuill } = require('react-quilljs');
  const { quill, quillRef } = useQuill();

  return (
    <FormControl>
      <InputLabel shrink={false} htmlFor={name}>
        {label}
      </InputLabel>
      {/* <TextareaAutosize
        aria-label="body"
        style={{ width: "60%", marginLeft: "15rem" }}
        minRows={5}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      /> */}
      <div style={{ width: 500, height: 300 }}>
        <div ref={quillRef} />
      </div>
    </FormControl>
  );
};

export default TextArea;
