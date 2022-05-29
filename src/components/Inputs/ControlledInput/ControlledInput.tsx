import React, { FC, ReactNode } from 'react';
import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export type ControlledInputProps = {
  name: string;
  label: string | ReactNode;
  errorText: string | ReactNode;
  rules: Record<string, unknown>;
  control: Control;
  type: string;
  defaultValue: string;
  multiline?: boolean;
  rows?: number;
};

const ControlledInput: FC<ControlledInputProps> = ({
  name,
  label,
  errorText,
  rules,
  control,
  type,
  multiline,
  defaultValue,
  rows,
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange }, fieldState: { error } }) => (
      <TextField
        type={type}
        label={label}
        onChange={onChange}
        error={!!error}
        helperText={error ? errorText : ' '}
        multiline={multiline}
        rows={rows}
        defaultValue={defaultValue}
        margin='normal'
        autoComplete='off'
        fullWidth
      />
    )}
  />
);

ControlledInput.defaultProps = {
  multiline: false,
  rows: 1,
};

export default ControlledInput;
