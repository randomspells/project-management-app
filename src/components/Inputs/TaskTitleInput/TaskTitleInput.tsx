import React, { FC, useState } from 'react';
import { InputAdornment, OutlinedInput, IconButton } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { COLUMN_WIDTH } from '../../../constants';

type TaskTitleInputProps = {
  title: string;
  saveHandler: (value: string) => void;
  closeHandler: () => void;
};

const TaskTitleEditInput: FC<TaskTitleInputProps> = ({ title, saveHandler, closeHandler }) => {
    const [value, setValue] = useState(title);
    return (
      <OutlinedInput 
        color='primary'
        id='title'
        size='small'
        value={value}
        sx={{ width: COLUMN_WIDTH }}
        onChange={(event)=>{setValue(event.target.value)}}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='save title handler'
              edge='end'
              onClick={()=>{saveHandler(value)}}
            >
              <CheckRoundedIcon />
            </IconButton>
            <IconButton
              aria-label='close edit handler'
              edge='end'
              onClick={closeHandler}
            >
              <CloseRoundedIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    );
  };

export default TaskTitleEditInput;
