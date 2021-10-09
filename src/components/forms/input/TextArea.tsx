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
  const theme = 'snow';

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered'}, { list: 'bullet' }],
    ],
  };

  const { quill, quillRef } = useQuill({ theme, modules });

  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(value);

      quill.on('text-change', (delta, oldDelta, source) => {
        setValue(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);

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
      <div style={{ width: 500, height: 200, marginBottom: '5rem' }}>
        <div ref={quillRef} />
      </div>
    </FormControl>
  );
};

export default TextArea;
