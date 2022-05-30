import { useDrop } from 'react-dnd';
import { ColumnInterface } from '../interfaces/index';
import { useAppSelector, useAppDispatch, useSetAlertResult } from '.';
import { useUpdateColumnMutation } from '../api/columns.api';
import { DndTypesEnum } from '../enums';
import { setAlertResult } from '../slices/alertSlice';
import { findColumnOrderById, setDndBackgroundColor } from '../utils';

export type ColumnDropProps = {
  columnId: string;
};

const useColumnDrop = ({ columnId }: ColumnDropProps) => {
  const board = useAppSelector((state) => state.board.currentBoard);
  const [updateColumn, { error: errorColumnUpdate }] =
    useUpdateColumnMutation();

  const dispatch = useAppDispatch();

  const [{ canDrop, isOver }, columnDrop] = useDrop(
    () => ({
      accept: DndTypesEnum.Column,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: ({ id: draggedId }: ColumnInterface) => {
        if (!columnId || !board || !draggedId) return;
        const newOrder = findColumnOrderById(board, columnId);
        const title = board.columns.find(
          (column) => column.id === draggedId,
        )?.title;
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
    [findColumnOrderById, board, columnId],
  );

  useSetAlertResult(false, errorColumnUpdate);

  const backgroundColor = setDndBackgroundColor(
    isOver,
    canDrop,
    'primary.main',
    '#ddd',
  );
  return { columnDrop, backgroundColor };
};

export default useColumnDrop;
