import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector, useSetAlertResult } from '.';
import { useCreateTaskMutation, useDeleteTaskMutation } from '../api/task.api';
import { DndTypesEnum } from '../enums';
import { ColumnIdInterface, DraggableTaskInterface } from '../interfaces';
import { setAlertResult } from '../slices/alertSlice';

const useTaskToListDrop = ({ columnId }: ColumnIdInterface) => {
  const currentTaskId = useAppSelector((state) => state.task.currentTask?.id);
  const currentColumnId = useAppSelector((state) => state.column.currentId);
  const board = useAppSelector((state) => state.board.currentBoard);
  const dispatch = useAppDispatch();

  const [
    createTask,
    { isSuccess: isSuccessTaskCreate, error: errorTaskCreate },
  ] = useCreateTaskMutation();
  const [
    deleteTask,
    { isSuccess: isSuccessTaskDelete, error: errorTaskDelete },
  ] = useDeleteTaskMutation();

  const [, taskToListDrop] = useDrop(
    () => ({
      accept: DndTypesEnum.Task,
      drop: ({
        title: draggedTitle,
        description: draggedDescription,
        userId: draggedUserId,
        id: draggedTaskId,
      }: DraggableTaskInterface) => {
        if (columnId === currentColumnId) return;
        if (!board || !columnId || !draggedTaskId) return;

        const bodyTaskCreate = {
          body: {
            title: draggedTitle,
            description: draggedDescription,
            userId: draggedUserId,
          },
          boardId: board.id,
          columnId,
        };

        const bodyTaskDelete = {
          boardId: board.id,
          columnId: currentColumnId,
          taskId: draggedTaskId,
        };

        deleteTask(bodyTaskDelete).catch((e) =>
          dispatch(setAlertResult({ error: e })),
        );
        createTask(bodyTaskCreate).catch((e) =>
          dispatch(setAlertResult({ error: e })),
        );
      },
    }),
    [board, currentColumnId, currentTaskId, columnId],
  );

  useSetAlertResult(isSuccessTaskCreate, errorTaskCreate);
  useSetAlertResult(isSuccessTaskDelete, errorTaskDelete);

  return [taskToListDrop];
};

export default useTaskToListDrop;
