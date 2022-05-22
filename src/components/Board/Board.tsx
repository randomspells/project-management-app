import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useNavigate } from 'react-router-dom';
import { BoardsGetInterface } from '../../interfaces';
import Confirmation from '../Confirmation/Confirmation';
import { useAppDispatch } from '../../hooks';
import { setCurrentBoard } from '../../slices/boardSlice';
import { RouteEnum } from '../../enums';
import { useDeleteBoardMutation, useGetBoardQuery } from '../../api/board.api';
import { setAlertResult } from '../../slices/alertSlice';
import { stopPropagation } from '../../utils';

const Board: FC<BoardsGetInterface> = ({ id, title, description }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const { data: board = [] } = useGetBoardQuery(id);
  const [deleteBoard, { error, isSuccess }] = useDeleteBoardMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const handleBoardClick = (e: MouseEvent) => {
    stopPropagation(e);
    dispatch(setCurrentBoard(board));
    navigate(`${RouteEnum.Board}/${id}`);
  };

  const handleDeleteClick = (e: MouseEvent) => {
    stopPropagation(e);
    toggleConfirmation();
  };

  const handleAcceptClick = () => {
    deleteBoard(id).catch((e) => dispatch(setAlertResult({ error: e })));
  };

  useEffect(() => {
    dispatch(setAlertResult({ error, isSuccess }));
  }, [error, isSuccess]);

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
          alignItems: 'flex-start',
        }}
      >
        <Box>
          <Typography
            component='h5'
            variant='h5'
            sx={{ color: 'common.white' }}
          >
            {title}
          </Typography>
          <Typography
            component='p'
            variant='body1'
            sx={{ color: 'common.white' }}
          >
            {description}
          </Typography>
        </Box>
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
          handleAccept={handleAcceptClick}
        />
      </CardContent>
    </Card>
  );
};

export default Board;
