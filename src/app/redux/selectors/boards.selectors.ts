import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from '@redux/state.models';

export const boardsSelector = createFeatureSelector<BoardsState>('boards');

export const allBoardsSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.boards,
);

export const currentBoardSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.currentBoard,
);

export const currentBoardIdSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.currentBoard?._id || null,
);

export const columnsSelector = createSelector(
  boardsSelector,
  (state: BoardsState) => state.columns,
);

export const tasksByColumnSelector = (columnId: string) => createSelector(
  boardsSelector,
  (state: BoardsState) => state.tasks.filter(task => task.columnId === columnId),
);

export const filesByTaskSelector = (taskId: string) => createSelector(
  boardsSelector,
  (state: BoardsState) => state.files.filter(file => file.taskId === taskId),
);
