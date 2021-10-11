import { FormControl, InputLabel, TextareaAutosize } from "@mui/material";
import React from "react";
import { TextInputProps } from "./TextInput";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const RichText: React.FC<TextInputProps> = ({
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
      ['image', 'video'],
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
      <div style={{ width: 500, height: 200, marginBottom: '5rem' }}>
        <div ref={quillRef} />
      </div>
    </FormControl>
  );
};

export default RichText;
