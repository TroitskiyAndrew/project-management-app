
import { BoardsState, UsersState } from '@redux/state.models';
import { BoardModel, ColumnModel, FileModel, PointModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';


export const addBoard = (state: BoardsState, payload: any): BoardsState => {
  const boards: BoardModel[] = payload.boards;
  if (payload._notifCallBack) {
    payload._notifCallBack('success', `"${boards.map(item => item.title).join(', ')}" board${boards.length > 1 ? 's' : ''} added`);
  }
  return {
    ...state,
    boards: [...state.boards, ...boards],
  };
};

export const updateBoard = (state: BoardsState, payload: any): BoardsState => {
  const boards: BoardModel[] = payload.boards;
  if (payload._notifCallBack) {
    payload._notifCallBack('info', `"${boards.map(item => item.title).join(', ')}" board${boards.length > 1 ? 's' : ''} edited`);
  }
  const ids = boards.map(item => item._id);
  return {
    ...state,
    boards: [...state.boards.filter(item => !ids.includes(item._id)), ...boards],
  };
};

export const deleteBoard = (state: BoardsState, payload: any): BoardsState => {
  const boards: BoardModel[] = payload.boards;
  if (payload._notifCallBack) {
    payload._notifCallBack('warning', `"${boards.map(item => item.title).join(', ')}" board${boards.length > 1 ? 's' : ''} deleted`);
  }
  const ids = boards.map(item => item._id);
  return {
    ...state,
    boards: [...state.boards.filter(item => !ids.includes(item._id))],
  };
};

export const addColumn = (state: BoardsState, payload: any): BoardsState => {
  const columns: ColumnModel[] = payload.columns;
  const boardIds = columns.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('success', `"${columns.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" column${columns.length > 1 ? 's' : ''} added`);
  }
  return {
    ...state,
    columns: [...state.columns, ...columns.filter(item => item.boardId === state.currentBoard!._id)],
  };
};

export const updateColumn = (state: BoardsState, payload: any): BoardsState => {
  const columns: ColumnModel[] = payload.columns;
  const boardIds = columns.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('info', `"${columns.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" column${columns.length > 1 ? 's' : ''} edited`);
  }
  const ids = columns.map(item => item._id);
  return {
    ...state,
    columns: [...state.columns.filter(item => !ids.includes(item._id)), ...columns.filter(item => item.boardId === state.currentBoard!._id)],
  };
};

export const deleteColumn = (state: BoardsState, payload: any): BoardsState => {
  const columns: ColumnModel[] = payload.columns;
  const boardIds = columns.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('warning', `"${columns.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" column${columns.length > 1 ? 's' : ''} deleted`);
  }
  const ids = columns.map(item => item._id);
  return {
    ...state,
    columns: [...state.columns.filter(item => !ids.includes(item._id))],
  };
};

export const addTask = (state: BoardsState, payload: any): BoardsState => {
  const tasks: TaskModel[] = payload.tasks;
  const boardIds = tasks.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('success', `"${tasks.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" task${tasks.length > 1 ? 's' : ''} added`);
  }
  return {
    ...state,
    tasks: [...state.tasks, ...tasks.filter(item => item.boardId === state.currentBoard!._id)],
  };
};

export const updateTask = (state: BoardsState, payload: any): BoardsState => {
  const tasks: TaskModel[] = payload.tasks;
  const boardIds = tasks.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('info', `"${tasks.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" task${tasks.length > 1 ? 's' : ''} edited`);
  }
  const ids = tasks.map(item => item._id);
  return {
    ...state,
    tasks: [...state.tasks.filter(item => !ids.includes(item._id)), ...tasks.filter(item => item.boardId === state.currentBoard!._id)],
  };
};

export const deleteTask = (state: BoardsState, payload: any): BoardsState => {
  const tasks: TaskModel[] = payload.tasks;
  const boardIds = tasks.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('warning', `"${tasks.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" task${tasks.length > 1 ? 's' : ''} deleted`);
  }
  const ids = tasks.map(item => item._id);
  return {
    ...state,
    tasks: [...state.tasks.filter(item => !ids.includes(item._id))],
  };
};

export const addPoint = (state: BoardsState, payload: any): BoardsState => {
  const points: PointModel[] = payload.points;
  const boardIds = points.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('success', `"${points.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" point${points.length > 1 ? 's' : ''} added`);
  }
  return {
    ...state,
    points: [...state.points, ...points.filter(item => item.boardId === state.currentBoard!._id)],
  };
};

export const updatePoint = (state: BoardsState, payload: any): BoardsState => {
  const points: PointModel[] = payload.points;
  const boardIds = points.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('info', `"${points.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" point${points.length > 1 ? 's' : ''} edited`);
  }
  const ids = points.map(item => item._id);
  return {
    ...state,
    points: [...state.points.filter(item => !ids.includes(item._id)), ...points.filter(item => item.boardId === state.currentBoard!._id)],
  };
};

export const deletePoint = (state: BoardsState, payload: any): BoardsState => {
  const points: PointModel[] = payload.points;
  const boardIds = points.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('warning', `"${points.filter(item => item.boardId === state.currentBoard!._id).map(item => item.title).join(', ')}" point${points.length > 1 ? 's' : ''} deleted`);
  }
  const ids = points.map(item => item._id);
  return {
    ...state,
    points: [...state.points.filter(item => !ids.includes(item._id))],
  };
};

export const addFile = (state: BoardsState, payload: any): BoardsState => {
  const files: FileModel[] = payload.files;
  const boardIds = files.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('success', `"${files.filter(item => item.boardId === state.currentBoard!._id).map(item => item.name).join(', ')}" file${files.length > 1 ? 's' : ''} added`);
  }
  return {
    ...state,
    files: [...state.files, ...files.filter(item => item.boardId === state.currentBoard!._id)],
  };
};

export const deleteFile = (state: BoardsState, payload: any): BoardsState => {
  const files: FileModel[] = payload.files;
  const boardIds = files.map(item => item.boardId);
  if (!state.currentBoard || !boardIds.includes(state.currentBoard!._id)) {
    return state;
  }
  if (payload._notifCallBack) {
    payload._notifCallBack('warning', `"${files.filter(item => item.boardId === state.currentBoard!._id).map(item => item.name).join(', ')}" file${files.length > 1 ? 's' : ''} deleted`);
  }
  const ids = files.map(item => item._id);
  return {
    ...state,
    files: [...state.files.filter(item => !ids.includes(item._id))],
  };
};

export const addUser = (state: UsersState, payload: any): UsersState => {
  const users: IUser[] = payload.users;
  if (payload._notifCallBack) {
    payload._notifCallBack('success', `"${users.map(item => item.name).join(', ')}" user${users.length > 1 ? 's' : ''} added`);
  }
  return {
    ...state,
    users: [...state.users, ...users],
  };
};

export const updateUser = (state: UsersState, payload: any): UsersState => {
  const users: IUser[] = payload.users;
  if (payload._notifCallBack) {
    payload._notifCallBack('info', `"${users.map(item => item.name).join(', ')}" user${users.length > 1 ? 's' : ''} edited`);
  }
  const ids = users.map(item => item._id);
  return {
    ...state,
    users: [...state.users.filter(item => !ids.includes(item._id)), ...users],
  };
};

export const deleteUser = (state: UsersState, payload: any): UsersState => {
  const users: IUser[] = payload.users;
  if (payload._notifCallBack) {
    payload._notifCallBack('warning', `"${users.map(item => item.name).join(', ')}" user${users.length > 1 ? 's' : ''} deleted`);
  }
  const ids = users.map(item => item._id);
  return {
    ...state,
    users: [...state.users.filter(item => !ids.includes(item._id))],
  };
};

