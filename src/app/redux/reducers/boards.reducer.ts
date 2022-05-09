import { createReducer, on } from '@ngrx/store';
import {
  clearCurrentBoardAction,
  setBoardsAction,
  setCurrentBoardAction,
} from '@redux/actions/boards.actions';
import { setColumnsAction } from '@redux/actions/columns.actions';
import { setFilesAction } from '@redux/actions/files.actions';
import { setTasksAction } from '@redux/actions/tasks.actions';
import { BoardsState } from '@redux/state.models';

const initialState: BoardsState = {
  currentBoard: null,
  boards: [],
  columns: [],
  tasks: [],
  files: [],
};

export const boardsReducer = createReducer(
  initialState,
  on(setCurrentBoardAction, (state, { board }) => ({ ...state, currentBoard: board })),
  on(setBoardsAction, (state, { boards }) => ({ ...state, boards })),
  on(setColumnsAction, (state, { columns }) => ({ ...state, columns })),
  on(setTasksAction, (state, { tasks }) => ({ ...state, tasks })),
  on(setFilesAction, (state, { files }) => ({ ...state, files })),
  on(clearCurrentBoardAction, (state) => ({ ...initialState, boards: state.boards })),
);
