import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersSelector } from '@redux/selectors/users.selectors';
import { BoardsState, UsersState } from '@redux/state.models';

export const boardsSelector = createFeatureSelector<BoardsState>('boards');

export const allBoardsSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.boards,
);

export const loadedSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.loaded,
);

export const currentBoardSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.currentBoard,
);

export const currentBoardIdSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.currentBoard?._id || null,
);

export const usersByBoardIdSelector = (boardId: string) => createSelector(
  boardsSelector,
  (state: BoardsState) => {
    const board = state.boards.find(item => item._id === boardId);
    if (!board) {
      return [];
    }
    const result = Array.from(new Set([...board.users, board.owner]));
    return result;
  },
);

export const columnsByBoarIdSelector = (boardId: string) => createSelector(
  boardsSelector,
  (state: BoardsState) => state.columns.filter(column => column.boardId === boardId),
);

export const columnsByCurrentBoardSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.columns.filter(column => column.boardId === state.currentBoard?._id),
);

export const tasksByCurrentBoardSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.tasks.filter(task => task.boardId === state.currentBoard?._id),
);

export const tasksByColumnSelector = (columnId: string) => createSelector(
  boardsSelector,
  (state: BoardsState) => state.tasks.filter(task => task.columnId === columnId),
);

export const filesByTaskSelector = (taskId: string) => createSelector(
  boardsSelector,
  (state: BoardsState) => state.files.filter(file => file.taskId === taskId),
);

export const pointsByTaskSelector = (taskId: string) => createSelector(
  boardsSelector,
  (state: BoardsState) => state.points.filter(point => point.taskId === taskId),
);

function isAnyCaseIncludes(target: string, request: string): boolean {
  return target.toUpperCase().includes(request.toUpperCase());
}

export const findTasksSelector = (search: string) => createSelector(
  boardsSelector,
  usersSelector,
  (state: BoardsState, users: UsersState) => {
    const usersIds = users.users.filter(user => isAnyCaseIncludes(user.name, search)).map(user => user._id);
    const tasksIdsFromPoints = state.points.filter(point => isAnyCaseIncludes(point.title, search)).map(point => point.taskId);
    return state.tasks.filter(task => {
      for (const user of task.users) {
        if (usersIds.includes(user)) {
          return true;
        }
      }
      if (tasksIdsFromPoints.includes(task._id)) {
        return true;
      }
      if (isAnyCaseIncludes(task.title, search)) {
        return true;
      }
      if (isAnyCaseIncludes(task.description, search)) {
        return true;
      }
      return false;
    });
  },
);

export const lastCreatedTask = createSelector(
  boardsSelector,
  (state: BoardsState) => state.lastCreatedTask,
);

