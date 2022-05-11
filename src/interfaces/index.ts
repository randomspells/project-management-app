export interface SignInInterface {
  login: string;
  password: string;
}

export interface SignUpInterface extends SignInInterface {
  name: string;
}

export interface FileInterface {
  filename: string;
  fileSize: number;
}

export interface TaskInterface {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: FileInterface[];
}

export interface ColumnInterface {
  id: string;
  title: string;
  order: number;
  tasks: TaskInterface[];
}

export interface BoardInterface {
  id: string;
  title: string;
}
