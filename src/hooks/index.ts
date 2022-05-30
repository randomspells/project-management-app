import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { ApiErrorType, TaskInterface } from '../interfaces/index';
import { DndTypesEnum, RouteEnum } from '../enums';
import { setAlertResult } from '../slices/alertSlice';
import { logIn } from '../slices/authSlice';
import type { RootState, AppDispatch } from '../store';
import { ColumnDropProps } from './useColumnDrop';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSetAlertResult = (isSuccess: boolean, error: ApiErrorType) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess || error) {
      dispatch(setAlertResult({ isSuccess, error }));
    }
  }, [isSuccess, error]);
};

export const useLogInWithRedirect = (
  token: string,
  error: ApiErrorType,
  login: string,
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !error) {
      dispatch(logIn({ token, login }));
      navigate(RouteEnum.Main);
    }
  }, [token]);
};

export const useTaskDrag = ({
  id,
  title,
  description,
  userId,
  order,
}: TaskInterface) => {
  const [{ isDragging }, taskDrag] = useDrag(() => ({
    type: DndTypesEnum.Task,
    item: { id, title, description, userId, order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return { taskDrag, isDragging };
};

export const useColumnDrag = ({ columnId }: ColumnDropProps) => {
  const columnTitle = useAppSelector(
    (state) =>
      state.board.currentBoard?.columns.find((column) => column.id === columnId)
        ?.title,
  );
  const [{ isDragging }, columnDrag] = useDrag(() => ({
    type: DndTypesEnum.Column,
    item: { title: columnTitle, id: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return { columnDrag, isDragging };
};
