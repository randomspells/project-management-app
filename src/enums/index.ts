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
}

export enum StorageEnum {
  Token = 'token',
  User = 'user',
  CurrentBoard = 'currentBoard',
  UserId = 'userId',
}

export enum TagsEnum {
  Boards = 'Boards',
  Columns = 'Columns',
  Board = 'Board',
}

export enum EndpointsEnum {
  Boards = 'boards',
  Columns = 'columns',
  Users = 'users',
}

export enum MethodsEnum {
  Get = 'GET',
  Put = 'PUT',
  Delete = 'DELETE',
  Post = 'POST',
}
