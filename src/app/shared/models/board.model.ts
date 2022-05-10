
export interface NewBoardModel {
  title: string
}
export interface BoardModel extends NewBoardModel {
  _id: string;
}

export interface NewColumnModel {
  title: string,
  boardId?: string,
  order: number,
}
export interface ColumnModel extends NewColumnModel {
  _id: string;
}

export interface NewTaskModel {
  title: string,
  order: number,
  description: string,
  boardId: string,
  columnId: string,
  userId: string,
  users: string[];
}
export interface TaskModel extends NewTaskModel {
  _id: string;
}

export interface NewFileModel {
  boardId: string,
  taskId: string,
  file: any,
}
export interface FileModel {
  _id: string;
  name: string,
  boardId: string,
  taskId: string,
  path: string,
}
