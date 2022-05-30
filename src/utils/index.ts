import { MouseEvent } from 'react';
import {
  ColumnInterface,
  BoardInterface,
  QueryErrorInterface,
  ApiErrorType,
  UserInterface,
  FilterBoardInterface,
} from '../interfaces/index';

// Avatar color generator

import { ErrorMessageEnum } from '../enums';
import LOCALES from '../translation/locales';

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const getFirstLetters = (name: string) => {
  const nameParts = name.split(' ');
  return nameParts
    .map((word) => word[0])
    .slice(0, 2)
    .join('');
};

export const stringAvatar = (name: string) => ({
  sx: {
    bgcolor: stringToColor(name),
  },
  children: getFirstLetters(name),
});

// Session storage tools

export const getItemFromStorage = (key: string): unknown => {
  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key) || '');
  }
  return '';
};

export const saveItemToStorage = (key: string, value: unknown): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const clearStorage = (): void => {
  sessionStorage.clear();
};

// Error handling

export const getErrorMessage = (error: ApiErrorType): string => {
  if (error instanceof Error) return error.message;
  if (error === undefined) return '';
  if ('data' in error) {
    return (error.data as QueryErrorInterface).message;
  }
  return ErrorMessageEnum.AppError;
};

// Stop Propagation

export const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
};

// get current user ID

export const getCurrentUserId = (
  users: UserInterface[],
  login: string,
): string | null => {
  const currentUser = users.find((user) => user.login === login);
  if (currentUser) {
    return currentUser.id;
  }
  return null;
};

export const getUserLoginById = (users: UserInterface[], id: string) => {
  const foundUser = users.find((user) => user.id === id);
  if (foundUser) {
    return foundUser.login;
  }
  return null;
};

export const filterData = (data: FilterBoardInterface[], searchValue: string) => 
  data.filter((arr) => {
    if (searchValue.length > 0) {
      return arr.title.toLowerCase().includes(searchValue.toLowerCase()) || arr.description.toLowerCase().includes(searchValue.toLowerCase());
    }
    return true;
});

export const countOrder = (list: Record<string, string>[]): number =>
  list.length === 0 ? 1 : Number(list[list.length - 1].order + 1);

// get item order by id

export const findColumnOrderById = (
  item: BoardInterface | null,
  id: string | null,
): number | null => {
  if (!item || !id) return null;
  return item.columns.find((column) => column.id === id)?.order || null;
};

export const findTaskOrderById = (
  item: ColumnInterface | null,
  taskId: string | null,
): number | null => {
  if (!item || !taskId) return null;
  return item.tasks.find((task) => task.id === taskId)?.order || null;
};

// set color for draggable object

export const setDndBackgroundColor = (
  isOver: boolean,
  canDrop: boolean,
  activeColor: string,
  canDropColor: string,
): string => {
  const isActive = canDrop && isOver;
  let backgroundColor = '';
  if (isActive) {
    backgroundColor = activeColor;
  } else if (canDrop) {
    backgroundColor = canDropColor;
  }
  return backgroundColor;
};

// initial localization

export function getInitialLocale() {
  const savedLocale = localStorage.getItem('locale');
  return savedLocale || LOCALES.ENGLISH;
}