import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApiErrorType } from '../interfaces/index';
import { RouteEnum } from '../enums';
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
