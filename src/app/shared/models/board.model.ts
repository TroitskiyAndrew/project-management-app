
export interface NewBoardModel {
  title: string,
  owner: string,
  users: string[],
}
export interface BoardModel extends NewBoardModel {
  _id: string;
}

export interface NewColumnModel {
  title: string,
  boardId: string,
  order: number,
}
export interface ColumnModel extends NewColumnModel {
  _id: string;
}

export interface TaskFormModel {
  title: string,
  description: string,
  users: string[],
  userId: string,
}

export interface NewTaskModel extends TaskFormModel {
  order: number,
  boardId: string,
  columnId: string,
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

export interface PointFace {
  title: string,
  done: boolean,
}

export interface NewPointModel extends PointFace {
  taskId: string,
  boardId: string,
}
export interface PointModel extends NewPointModel {
  _id: string;
}
