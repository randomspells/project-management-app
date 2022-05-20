// functions from MUI Docs

import { ErrorMessageEnum } from '../enums';
import { ApiErrorType } from '../interfaces';

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
  if (error === undefined) return '';
  if (!('status' in error)) {
    return ErrorMessageEnum.AppError;
  }
  if (error.status >= 400 && error.status < 500) {
    return ErrorMessageEnum.ClientError;
  }
  if (error.status >= 500 && error.status < 600) {
    return ErrorMessageEnum.ServerError;
  }
  return ErrorMessageEnum.UnknownError;
};
