import { Card, CardContent, IconButton, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { BoardInterface } from '../../interfaces';
import Confirmation from '../Confirmation/Confirmation';

const Board: FC<BoardInterface> = ({ id, title }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  return (
    <Card id={id} sx={{ bgcolor: 'primary.dark' }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component='h5' variant='h5'>
          {title}
        </Typography>
        <IconButton aria-label='delete board' color='secondary' onClick={toggleConfirmation}>
          <DeleteRoundedIcon />
        </IconButton>
        <Confirmation
          itemTitle={title}
          isOpen={isConfirmationOpen}
          toggleConfirmation={toggleConfirmation}
          handleAccept={() => console.log('Deleting board...')}
        />
      </CardContent>
    </Card>
  );
};

export default Board;
