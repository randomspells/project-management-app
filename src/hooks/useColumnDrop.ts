import { useDrop } from 'react-dnd';
import {
  ColumnIdInterface,
  DraggableTaskListInterface,
} from '../interfaces/index';
import { useAppSelector, useAppDispatch, useSetAlertResult } from '.';

import { useUpdateColumnMutation } from '../api/columns.api';
import { DndTypesEnum } from '../enums';

import { setAlertResult } from '../slices/alertSlice';
import { findColumnOrderById } from '../utils';

const useColumnDrop = ({ columnId }: ColumnIdInterface) => {
  const board = useAppSelector((state) => state.board.currentBoard);
  const [
    updateColumn,
    { isSuccess: isSuccessColumnUpdate, error: errorColumnUpdate },
  ] = useUpdateColumnMutation();

  const dispatch = useAppDispatch();

  const [, columnDrop] = useDrop(
    () => ({
      accept: DndTypesEnum.TaskList,
      drop: ({
        title: draggedTitle,
        id: draggedId,
      }: DraggableTaskListInterface) => {
        if (!board) return;
        const newOrder = findColumnOrderById(board, columnId);
        const updateBody = {
          body: {
            title: draggedTitle,
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
    [findColumnOrderById, board],
  );
  useSetAlertResult(isSuccessColumnUpdate, errorColumnUpdate);
  return [columnDrop];
};

export default useColumnDrop;
