import React, { FC } from 'react';

type TextInputType = {
  inputName: string;
  inputHandler: () => void;
};

const TextInput: FC<TextInputType> = ({ inputName, inputHandler }) => (
  <input type='text' name={inputName} onChange={inputHandler} />
);

export default TextInput;
