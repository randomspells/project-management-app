import { useDrop } from 'react-dnd';
import { useAppSelector, useAppDispatch, useSetAlertResult } from '.';
import { useUpdateTaskMutation } from '../api/task.api';
import { DndTypesEnum } from '../enums';
import { DraggableTaskInterface, TaskToTaskDropInterface } from '../interfaces';
import { setAlertResult } from '../slices/alertSlice';
import { findTaskOrderById, setDndBackgroundColor } from '../utils';

const useTaskToTaskDrop = ({ taskId, columnId }: TaskToTaskDropInterface) => {
  const board = useAppSelector((state) => state.board.currentBoard);
  const currentTask = useAppSelector((state) => state.task.currentTask);
  const [updateTask, { error: errorUpdate }] = useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  const [{ canDrop, isOver }, taskToTaskDrop] = useDrop(
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
        if (!columnId || !board) return;
        const droppedColumn = board.columns.find(
          (column) => column.id === columnId,
        );
        if (!droppedColumn) return;
        const newOrder = findTaskOrderById(droppedColumn, taskId);
        if (!newOrder || !currentTask) return;
        const title = currentTask?.title;
        const description = currentTask?.description;
        const updateBody = {
          body: {
            title,
            order: newOrder,
            description,
            userId: draggedUserId,
            boardId: board.id,
            columnId,
          },
          boardId: board.id,
          columnId,
          taskId: draggedTaskId,
        };
        updateTask(updateBody).catch((e) =>
          dispatch(setAlertResult({ error: e })),
        );
      },
    }),
    [findTaskOrderById, board, currentTask],
  );

  const backgroundColor = setDndBackgroundColor(canDrop, isOver, '#eee', '');

  useSetAlertResult(false, errorUpdate);

  return { taskToTaskDrop, backgroundColor };
};
export default useTaskToTaskDrop;
