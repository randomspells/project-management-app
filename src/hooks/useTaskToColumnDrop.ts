import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector, useSetAlertResult } from '.';
import { useCreateTaskMutation, useDeleteTaskMutation } from '../api/task.api';
import { DndTypesEnum } from '../enums';
import { TaskDropInterface, DraggableTaskInterface } from '../interfaces';
import { setAlertResult } from '../slices/alertSlice';
import { setDndBackgroundColor } from '../utils';

const useTaskToColumnDrop = ({ columnId }: TaskDropInterface) => {
  const currentTask = useAppSelector((state) => state.task.currentTask);
  const currentColumnId = useAppSelector((state) => state.column.currentId);
  const board = useAppSelector((state) => state.board.currentBoard);

  const dispatch = useAppDispatch();

  const [createTask, { error: errorTaskCreate }] = useCreateTaskMutation();
  const [deleteTask, { error: errorTaskDelete }] = useDeleteTaskMutation();

  const [{ canDrop, isOver }, taskToColumnDrop] = useDrop(
    () => ({
      accept: DndTypesEnum.Task,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: ({
        userId: draggedUserId,
        id: draggedTaskId,
      }: DraggableTaskInterface) => {
        if (columnId === currentColumnId) return;
        if (!board || !columnId || !draggedTaskId) return;
        if (!currentTask) return;
        const droppedColumn = board.columns.find(
          (column) => column.id === columnId,
        );
        if (!droppedColumn) return;
        const bodyTaskCreate = {
          body: {
            title: currentTask.title,
            description: currentTask.description,
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
    [board, currentTask],
  );

  const backgroundColor = setDndBackgroundColor(
    canDrop,
    isOver,
    'primary.main',
    '#ddd',
  );

  useSetAlertResult(false, errorTaskCreate);
  useSetAlertResult(false, errorTaskDelete);

  return { taskToColumnDrop, backgroundColor };
};

export default useTaskToColumnDrop;
