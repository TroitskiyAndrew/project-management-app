
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
  const columnsForStateBoards = columns.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (columnsForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const columnsToNotyfy = columnsForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (columnsToNotyfy.length > 0) {
      payload._notifCallBack('success', `"${columnsToNotyfy.map(item => item.title).join(', ')}" column${columnsToNotyfy.length > 1 ? 's' : ''} added`);
    }
  }
  return {
    ...state,
    columns: [...state.columns, ...columnsForStateBoards],
  };
};

export const updateColumn = (state: BoardsState, payload: any): BoardsState => {
  const columns: ColumnModel[] = payload.columns;
  const columnsForStateBoards = columns.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (columnsForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const columnsToNotyfy = columnsForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (columnsToNotyfy.length > 0) {
      payload._notifCallBack('info', `"${columnsToNotyfy.map(item => item.title).join(', ')}" column${columns.length > 1 ? 's' : ''} edited`);
    }
  }
  const ids = columnsForStateBoards.map(item => item._id);
  return {
    ...state,
    columns: [...state.columns.filter(item => !ids.includes(item._id)), ...columnsForStateBoards],
  };
};

export const deleteColumn = (state: BoardsState, payload: any): BoardsState => {
  const columns: ColumnModel[] = payload.columns;
  const columnsForStateBoards = columns.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (columnsForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const columnsToNotyfy = columnsForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (columnsToNotyfy.length > 0) {
      payload._notifCallBack('warning', `"${columnsToNotyfy.map(item => item.title).join(', ')}" column${columns.length > 1 ? 's' : ''} deleted`);
    }
  }
  const ids = columnsForStateBoards.map(item => item._id);
  return {
    ...state,
    columns: [...state.columns.filter(item => !ids.includes(item._id))],
  };
};

export const addTask = (state: BoardsState, payload: any): BoardsState => {
  const tasks: TaskModel[] = payload.tasks;
  const tasksForStateBoards = tasks.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (tasksForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const tasksToNotyfy = tasksForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (tasksToNotyfy.length > 0) {
      payload._notifCallBack('success', `"${tasksToNotyfy.map(item => item.title).join(', ')}" task${tasksToNotyfy.length > 1 ? 's' : ''} added`);
    }
  }
  return {
    ...state,
    tasks: [...state.tasks, ...tasksForStateBoards],
  };
};

export const updateTask = (state: BoardsState, payload: any): BoardsState => {
  const tasks: TaskModel[] = payload.tasks;
  const tasksForStateBoards = tasks.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (tasksForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const tasksToNotyfy = tasksForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (tasksToNotyfy.length > 0) {
      payload._notifCallBack('info', `"${tasksToNotyfy.map(item => item.title).join(', ')}" task${tasks.length > 1 ? 's' : ''} edited`);
    }
  }
  const ids = tasksForStateBoards.map(item => item._id);
  return {
    ...state,
    tasks: [...state.tasks.filter(item => !ids.includes(item._id)), ...tasksForStateBoards],
  };
};

export const deleteTask = (state: BoardsState, payload: any): BoardsState => {
  const tasks: TaskModel[] = payload.tasks;
  const tasksForStateBoards = tasks.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (tasksForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const tasksToNotyfy = tasksForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (tasksToNotyfy.length > 0) {
      payload._notifCallBack('warning', `"${tasksToNotyfy.map(item => item.title).join(', ')}" task${tasks.length > 1 ? 's' : ''} deleted`);
    }
  }
  const ids = tasksForStateBoards.map(item => item._id);
  return {
    ...state,
    tasks: [...state.tasks.filter(item => !ids.includes(item._id))],
  };
};

export const addPoint = (state: BoardsState, payload: any): BoardsState => {
  const points: PointModel[] = payload.points;
  const pointsForStateBoards = points.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (pointsForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const pointsToNotyfy = pointsForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (pointsToNotyfy.length > 0) {
      payload._notifCallBack('success', `"${pointsToNotyfy.map(item => item.title).join(', ')}" point${pointsToNotyfy.length > 1 ? 's' : ''} added`);
    }
  }
  return {
    ...state,
    points: [...state.points, ...pointsForStateBoards],
  };
};

export const updatePoint = (state: BoardsState, payload: any): BoardsState => {
  const points: PointModel[] = payload.points;
  const pointsForStateBoards = points.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (pointsForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const pointsToNotyfy = pointsForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (pointsToNotyfy.length > 0) {
      payload._notifCallBack('info', `"${pointsToNotyfy.map(item => item.title).join(', ')}" point${points.length > 1 ? 's' : ''} edited`);
    }
  }
  const ids = pointsForStateBoards.map(item => item._id);
  return {
    ...state,
    points: [...state.points.filter(item => !ids.includes(item._id)), ...pointsForStateBoards],
  };
};

export const deletePoint = (state: BoardsState, payload: any): BoardsState => {
  const points: PointModel[] = payload.points;
  const pointsForStateBoards = points.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (pointsForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const pointsToNotyfy = pointsForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (pointsToNotyfy.length > 0) {
      payload._notifCallBack('warning', `"${pointsToNotyfy.map(item => item.title).join(', ')}" point${points.length > 1 ? 's' : ''} deleted`);
    }
  }
  const ids = pointsForStateBoards.map(item => item._id);
  return {
    ...state,
    points: [...state.points.filter(item => !ids.includes(item._id))],
  };
};

export const addFile = (state: BoardsState, payload: any): BoardsState => {
  const files: FileModel[] = payload.files;
  const filesForStateBoards = files.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (filesForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const filesToNotyfy = filesForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (filesToNotyfy.length > 0) {
      payload._notifCallBack('success', `"${filesToNotyfy.map(item => item.name).join(', ')}" file${filesToNotyfy.length > 1 ? 's' : ''} added`);
    }
  }
  return {
    ...state,
    files: [...state.files, ...filesForStateBoards],
  };
};

export const deleteFile = (state: BoardsState, payload: any): BoardsState => {
  const files: FileModel[] = payload.files;
  const filesForStateBoards = files.filter(item => state.boards.map(board => board._id).includes(item.boardId));
  if (filesForStateBoards.length === 0) {
    return state;
  }
  if (payload._notifCallBack && state.currentBoard) {
    const filesToNotyfy = filesForStateBoards.filter(item => item.boardId === state.currentBoard?._id);
    if (filesToNotyfy.length > 0) {
      payload._notifCallBack('warning', `"${filesToNotyfy.map(item => item.name).join(', ')}" file${files.length > 1 ? 's' : ''} deleted`);
    }
  }
  const ids = filesForStateBoards.map(item => item._id);
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

