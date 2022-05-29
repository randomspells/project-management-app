import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { ReactElement } from 'react';
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
  files: FileInterface[];
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

export interface FormDataInterface {
  [x: string]: string;
}

export interface InputInterface {
  type: string;
  name: string;
  label: string;
  errorText: string;
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

export interface DraggableTaskListInterface {
  title: string;
  id: string;
}

export interface DraggableTaskInterface {
  id: string;
  title: string;
  description: string;
  userId: string;
  boardId: string | null;
}

export interface ColumnIdInterface {
  columnId: string;
}

export interface TaskToTaskInterface {
  id: string;
  boardId: string | null;
  board: BoardInterface | null;
  columnId: string | null;
  currentTaskId: string | null;
}

export interface TaskToListInterface {
  columnId: string;
}

export type ApiErrorType =
  | FetchBaseQueryError
  | SerializedError
  | Error
  | undefined;
