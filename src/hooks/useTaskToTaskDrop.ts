import { useDrop } from 'react-dnd';
import { useAppDispatch, useSetAlertResult } from '.';
import { useUpdateTaskMutation } from '../api/task.api';
import { DndTypesEnum } from '../enums';
import { DraggableTaskInterface, TaskToTaskDropInterface } from '../interfaces';
import { setAlertResult } from '../slices/alertSlice';
import { findTaskOrderById } from '../utils';

const useTaskToTaskDrop = ({
  taskId,
  boardId,
  board,
  columnId,
}: TaskToTaskDropInterface) => {
  const [updateTask, { error: errorUpdate, isSuccess: isSuccessUpdate }] =
    useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  const [, taskToTaskDrop] = useDrop(
    () => ({
      accept: DndTypesEnum.Task,
      drop: ({
        title: draggedTitle,
        description: draggedDescription,
        userId: draggedUserId,
        boardId: draggedBoardId,
      }: DraggableTaskInterface) => {
        if (!columnId || !board) return;
        const { columns } = board;
        const droppedColumnIndex = columns.findIndex(
          (column) => column.id === columnId,
        );
        const newOrder = findTaskOrderById(columns[droppedColumnIndex], taskId);
        if (!newOrder) return;
        const updateBody = {
          body: {
            title: draggedTitle,
            order: newOrder,
            description: draggedDescription,
            userId: draggedUserId,
            boardId: draggedBoardId,
            columnId,
          },
          boardId,
          columnId,
          taskId,
        };
        updateTask(updateBody).catch((e) =>
          dispatch(setAlertResult({ error: e })),
        );
      },
    }),
    [findTaskOrderById, board, columnId, taskId],
  );

  useSetAlertResult(isSuccessUpdate, errorUpdate);

  return [taskToTaskDrop];
};
export default useTaskToTaskDrop;
