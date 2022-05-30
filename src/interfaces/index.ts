import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { ReactElement, ReactNode } from 'react';
import { Control } from 'react-hook-form';

export interface SignInInterface {
  login: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  name: string;
}

export interface UserInterface {
  id: string;
  name: string;
  login: string;
}

export interface TokenInterface {
  token: string;
}

export interface FileInterface {
  filename: string;
  fileSize: number;
}

export interface TaskInterface {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
  files?: FileInterface[];
}

export interface TasksPostInterface {
  title: string;
  description: string;
}

export interface ColumnInterface {
  id: string;
  title: string;
  order: number;
  tasks: TaskInterface[];
}

export interface BoardsPostInterface {
  title: string;
  description: string;
}

export interface BoardsGetInterface extends BoardsPostInterface {
  id: string;
}

export interface BoardInterface extends BoardsGetInterface {
  columns: ColumnInterface[];
}

export interface FilterBoardInterface {
  id: string;
  title: string;
  description: string;
}

export interface FormDataInterface {
  [x: string]: string;
}

export interface InputInterface {
  type: string;
  name: string;
  label: string | ReactNode;
  errorText: string | ReactNode;
  rules: Record<string, unknown>;
  multiline?: boolean;
  rows?: number;
}

export interface ControlledInputInterface extends InputInterface {
  defaultValue: string;
  control: Control;
}

export interface ProtectedRouteInterface {
  children?: React.ReactElement;
}

export interface WelcomeInfoInterface {
  title: string;
  description: string;
  icon: ReactElement;
}

export interface QueryErrorInterface {
  statusCode: number;
  message: string;
}

export interface DraggableTaskInterface {
  title: string;
  description: string;
  userId: string;
  id: string;
}

export interface ColumnDropInterface {
  columnId: string | null;
  title: string;
}

export interface TaskDropInterface {
  columnId: string | null;
}

export interface TaskToTaskDropInterface {
  title: string;
  taskId: string | null;
  columnId: string | null;
}

export interface TaskToListDropInterface {
  columnId: string;
}

export type ApiErrorType =
  | FetchBaseQueryError
  | SerializedError
  | Error
  | undefined;
