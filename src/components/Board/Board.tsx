import React, { FC, MouseEvent, useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useNavigate } from 'react-router-dom';
import { BoardsGetInterface } from '../../interfaces';
import Confirmation from '../Confirmation/Confirmation';
import { useAppDispatch } from '../../hooks';
import { setCurrentBoard } from '../../slices/boardSlice';
import { RouteEnum } from '../../enums';
import { useDeleteBoardMutation, useGetBoardIdQuery } from '../../api/board.api';

const Board: FC<BoardsGetInterface> = ({ id, title, description }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const { data } = useGetBoardIdQuery(id);
  const [deleteBoard] = useDeleteBoardMutation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const handleBoardClick = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(setCurrentBoard(id));
    navigate(`${RouteEnum.Board}/${data!.id}`);
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    toggleConfirmation();
  };

  const handleAcceptClick = (boardId: string) => {
    deleteBoard(boardId);
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
          boardId={id}
          isOpen={isConfirmationOpen}
          toggleConfirmation={toggleConfirmation}
          handleAccept={handleAcceptClick}
        />
      </CardContent>
    </Card>
  );
};

export default Board;
