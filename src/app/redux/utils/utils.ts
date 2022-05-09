
import { BoardsState, UsersState } from '@redux/state.models';
import { BoardModel, ColumnModel, FileModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';


export const addBoard = (state: BoardsState, payload: any): BoardsState => {
  const board: BoardModel = payload.board;
  payload._notifCallBack('success', `"${board.title}" board added`);
  return {
    ...state,
    boards: [...state.boards, board],
  };
};

export const updateBoard = (state: BoardsState, payload: any): BoardsState => {
  const board: BoardModel = payload.board;
  payload._notifCallBack('info', `"${board.title}" board edited`);
  return {
    ...state,
    boards: [...state.boards.filter(item => item._id !== board._id), board],
  };
};

export const deleteBoard = (state: BoardsState, payload: any): BoardsState => {
  const board: BoardModel = payload.board;
  payload._notifCallBack('warning', `"${board.title}" board deleted`);
  return {
    ...state,
    boards: [...state.boards.filter(item => item._id !== board._id)],
  };
};

export const addColumn = (state: BoardsState, payload: any): BoardsState => {
  const column: ColumnModel = payload.column;
  if (column.boardId !== state.currentBoard?._id) {
    return state;
  }
  payload._notifCallBack('success', `"${column.title}" column added`);
  return {
    ...state,
    columns: [...state.columns, column],
  };
};

export const updateColumn = (state: BoardsState, payload: any): BoardsState => {
  const column: ColumnModel = payload.column;
  if (column.boardId !== state.currentBoard?._id) {
    return state;
  }
  payload._notifCallBack('info', `"${column.title}" column edited`);
  return {
    ...state,
    columns: [...state.columns.filter(item => item._id !== column._id), column],
  };
};

export const deleteColumn = (state: BoardsState, payload: any): BoardsState => {
  const column: ColumnModel = payload.column;
  if (column.boardId !== state.currentBoard?._id) {
    return state;
  }
  payload._notifCallBack('warning', `"${column.title}" column deleted`);
  return {
    ...state,
    columns: [...state.columns.filter(item => item._id !== column._id)],
  };
};

export const addTask = (state: BoardsState, payload: any): BoardsState => {
  const task: TaskModel = payload.task;
  if (task.boardId !== state.currentBoard?._id) {
    return state;
  }
  payload._notifCallBack('success', `"${task.title}" task added`);
  return {
    ...state,
    tasks: [...state.tasks, task],
  };
};

export const updateTask = (state: BoardsState, payload: any): BoardsState => {
  const task: TaskModel = payload.task;
  if (task.boardId !== state.currentBoard?._id) {
    return state;
  }
  payload._notifCallBack('info', `"${task.title}" task edited`);
  return {
    ...state,
    tasks: [...state.tasks.filter(item => item._id !== task._id), task],
  };
};

export const deleteTask = (state: BoardsState, payload: any): BoardsState => {
  const task: TaskModel = payload.task;
  if (task.boardId !== state.currentBoard?._id) {
    return state;
  }
  payload._notifCallBack('warning', `"${task.title}" task deleted`);
  return {
    ...state,
    tasks: [...state.tasks.filter(item => item._id !== task._id)],
  };
};

export const addFile = (state: BoardsState, payload: any): BoardsState => {
  const file: FileModel = payload.file;
  if (file.boardId !== state.currentBoard?._id) {
    return state;
  }
  payload._notifCallBack('success', `${file.name} file added`);
  return {
    ...state,
    files: [...state.files, file],
  };
};

export const deleteFile = (state: BoardsState, payload: any): BoardsState => {
  const file: FileModel = payload.file;
  if (file.boardId !== state.currentBoard?._id) {
    return state;
  }
  payload._notifCallBack('warning', `${file.name} file deleted`);
  return {
    ...state,
    files: [...state.files.filter(item => item._id !== file._id)],
  };
};

export const addUser = (state: UsersState, payload: any): UsersState => {
  const user: IUser = payload.user;
  return {
    ...state,
    users: [...state.users, user],
  };
};

export const updateUser = (state: UsersState, payload: any): UsersState => {
  const user: IUser = payload.user;
  return {
    ...state,
    users: [...state.users.filter(item => item._id !== user._id), user],
  };
};

export const deleteUser = (state: UsersState, payload: any): UsersState => {
  const user: IUser = payload.user;
  return {
    ...state,
    users: [...state.users.filter(item => item._id !== user._id)],
  };
};
