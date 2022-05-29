export enum FormTitleEnum {
  NewTaskList = 'New task list',
  NewBoard = 'New board',
  NewTask = 'New task',
  EditTask = 'Edit task',
}

export enum RouteEnum {
  Welcome = '/',
  Main = '/main',
  Board = '/board',
  Login = '/login',
  Signup = '/signup',
  EditProfile = '/edit-profile',
}

export enum ErrorMessageEnum {
  NoResponse = 'No response from server',
  NotAuthorized = 'User should be authorized',
  NotFound = 'Resource is not found',
  UnknownError = 'An error occured',
  AppError = 'An application error occured',
  ClientError = 'Client network error occured',
  ServerError = 'Server network error occured',
  IncorrectPassword = 'Incorrect password',
}

export enum StorageEnum {
  Token = 'token',
  User = 'user',
  CurrentBoard = 'currentBoard',
  UserId = 'userId',
}

export enum TagsEnum {
  Users = 'Users',
  Boards = 'Boards',
  Board = 'Board',
  Columns = 'Columns',
  Tasks = 'Tasks',
}

export enum EndpointsEnum {
  Users = 'users',
  Boards = 'boards',
  Columns = 'columns',
  Tasks = 'tasks',
}

export enum MethodsEnum {
  Get = 'GET',
  Put = 'PUT',
  Delete = 'DELETE',
  Post = 'POST',
}

export enum DndTypesEnum {
  TaskList = 'tasklist',
  Task = 'task',
}
