import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import {
  ApiErrorType,
  DraggableTaskInterface,
  DraggableTaskListInterface,
} from '../interfaces/index';
import { DndTypesEnum, RouteEnum } from '../enums';
import { setAlertResult } from '../slices/alertSlice';
import { logIn } from '../slices/authSlice';
import type { RootState, AppDispatch } from '../store';

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
  boardId,
}: DraggableTaskInterface) => {
  const [, taskDrag] = useDrag(() => ({
    type: DndTypesEnum.Task,
    item: { id, title, description, userId, boardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return [taskDrag];
};

export const useTaskListDrag = ({ title, id }: DraggableTaskListInterface) => {
  const [, taskListDrag] = useDrag(() => ({
    type: DndTypesEnum.TaskList,
    item: { title, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return [taskListDrag];
};
