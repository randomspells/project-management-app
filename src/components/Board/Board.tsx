import React, { FC, MouseEvent, useState } from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useNavigate } from 'react-router-dom';
import { BoardInterface } from '../../interfaces';
import Confirmation from '../Confirmation/Confirmation';
import { useAppDispatch } from '../../hooks';
import { setCurrentBoard } from '../../slices/boardSlice';
import { RouteEnum } from '../../enums';

const Board: FC<BoardInterface> = ({ id, title }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    toggleConfirmation();
  };

  const handleBoardClick = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(setCurrentBoard(id));
    navigate(`${RouteEnum.Board}/${id}`);
  };

  return (
    <Card
      id={id}
      sx={{ bgcolor: 'primary.dark', cursor: 'pointer' }}
      onClick={handleBoardClick}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography component='h5' variant='h5' sx={{ color: 'common.white' }}>
          {title}
        </Typography>
        <IconButton
          aria-label='delete board'
          color='secondary'
          onClick={handleDeleteClick}
        >
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
