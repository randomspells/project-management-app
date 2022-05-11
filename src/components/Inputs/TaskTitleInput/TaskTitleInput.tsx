import React, { FC } from 'react';
import { InputAdornment, OutlinedInput, IconButton } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type TaskTitleInputProps = { title: string; saveHandler: () => void; closeHandler: () => void };

const TaskTitleEditInput: FC<TaskTitleInputProps> = ({ title, saveHandler, closeHandler }) => (
  <OutlinedInput
    color='primary'
    id='title'
    size='small'
    value={title}
    endAdornment={
      <InputAdornment position='end'>
        <IconButton aria-label='toggle password visibility' edge='end' onClick={saveHandler}>
          <CheckRoundedIcon />
        </IconButton>
        <IconButton aria-label='toggle password visibility' edge='end' onClick={closeHandler}>
          <CloseRoundedIcon />
        </IconButton>
      </InputAdornment>
    }
  />
);

export default TaskTitleEditInput;
