import React, { FC, MouseEvent, useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useNavigate } from 'react-router-dom';
import { BoardsGetInterface } from '../../../interfaces';
import Confirmation from '../../modals/Confirmation/Confirmation';
import { useAppDispatch, useSetAlertResult } from '../../../hooks';
import { setCurrentBoard } from '../../../slices/boardSlice';
import { RouteEnum } from '../../../enums';
import {
  useDeleteBoardMutation,
  useGetBoardQuery,
} from '../../../api/board.api';
import { setAlertResult } from '../../../slices/alertSlice';
import { stopPropagation, stringToColor } from '../../../utils';
import style from './Board.module.scss';

const Board: FC<BoardsGetInterface> = ({ id, title, description }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const { data: board = [] } = useGetBoardQuery(id);
  const [
    deleteBoard,
    { error: deleteBoardError, isSuccess: isDeleteBoardSuccess },
  ] = useDeleteBoardMutation();

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

  const { stripe, card, text } = style;

  useSetAlertResult(isDeleteBoardSuccess, deleteBoardError);

  return (
    <Card
      className={card}
      component='article'
      id={id}
      sx={{
        position: 'relative',
        bgcolor: 'primary.dark',
        cursor: 'pointer',
        height: 125,
      }}
      onClick={handleBoardClick}
    >
      <div
        className={stripe}
        style={{ backgroundColor: stringToColor(title) }}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ width: '80%', overflowWrap: 'break-word' }}>
          <Typography
            component='h5'
            variant='h5'
            sx={{ color: 'common.white', mb: 1 }}
          >
            {title}
          </Typography>
          <Typography
            className={text}
            component='p'
            variant='body1'
            sx={{ color: 'common.white', height: 45, overflow: 'auto' }}
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
