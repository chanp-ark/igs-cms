import { FormControl, Input, InputLabel } from "@mui/material";
import React from "react";

export interface TextInputProps {
  name: string;
  label: string;
  value: string;
  setValue: (newValue: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  setValue,
}) => {
  return (
    <FormControl>
      <InputLabel htmlFor={name} shrink={false}>
        {label}
      </InputLabel>
      <Input
        type="text"
        name={name}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
};

export default TextInput;
