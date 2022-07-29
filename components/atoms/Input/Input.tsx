import React, { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    name?: string;
    placeholder?: string;
    onChange?: (...args: any) => any;
  }


const Input:React.FC<InputProps> = ({...props}) => {
  return (
      <input
        type="text"
        placeholder="Search for location"
        {...props}
      />
  );
};

export default Input;
