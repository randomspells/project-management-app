import { useDrop } from 'react-dnd';
import { ColumnInterface } from '../interfaces/index';
import { useAppSelector, useAppDispatch, useSetAlertResult } from '.';

import { useUpdateColumnMutation } from '../api/columns.api';
import { DndTypesEnum } from '../enums';

import { setAlertResult } from '../slices/alertSlice';
import { findColumnOrderById } from '../utils';

const useColumnDrop = (column?: ColumnInterface) => {
  const board = useAppSelector((state) => state.board.currentBoard);
  const [
    updateColumn,
    { isSuccess: isSuccessColumnUpdate, error: errorColumnUpdate },
  ] = useUpdateColumnMutation();

  const dispatch = useAppDispatch();

  const [, columnDrop] = useDrop(
    () => ({
      accept: DndTypesEnum.Column,
      drop: ({ id: draggedId }: ColumnInterface) => {
        console.log(draggedId);
        if (!column || !board || !draggedId) return;
        const { id, title } = column;
        const newOrder = findColumnOrderById(board, id);
        const updateBody = {
          body: {
            title,
            order: newOrder,
          },
          boardId: board?.id,
          columnId: draggedId,
        };
        updateColumn(updateBody).catch((e) =>
          dispatch(setAlertResult({ error: e })),
        );
      },
    }),
    [findColumnOrderById, board, column],
  );

  useSetAlertResult(isSuccessColumnUpdate, errorColumnUpdate);

  return [columnDrop];
};

export default useColumnDrop;
