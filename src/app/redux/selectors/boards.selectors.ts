import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from '@redux/state.models';

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

export const columnsByBoarIdSelector = (boardId: string) => createSelector(
  boardsSelector,
  (state: BoardsState) => state.columns.filter(column => column.boardId === boardId),
);

export const columnsByCurrentBoardSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.columns.filter(column => column.boardId === state.currentBoard?._id),
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
