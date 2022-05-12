import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type ControlledInputProps = {
  inputName: string;
  labelText: string;
  errorText: string;
  validationRules: Record<string, unknown>;
  inputControl: Control;
  inputType: string;
};

const ControlledInput: FC<ControlledInputProps> = ({
  inputName,
  validationRules,
  labelText,
  errorText,
  inputControl,
  inputType,
}) => (
  <Controller
    name={inputName}
    control={inputControl}
    defaultValue=''
    rules={validationRules}
    render={({ field: { onChange }, fieldState: { error } }) => (
      <TextField
        type={inputType}
        label={labelText}
        onChange={onChange}
        error={!!error}
        helperText={error ? errorText : ' '}
        margin='dense'
        fullWidth
      />
    )}
  />
);

export default ControlledInput;
