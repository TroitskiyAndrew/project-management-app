import { createReducer, on } from '@ngrx/store';
import {
  clearCurrentBoardAction,
  createBoardSocketAction,
  deleteBoardSocketAction,
  setBoardsAction,
  setCurrentBoardAction,
  updateBoardSocketAction,
} from '@redux/actions/boards.actions';
import { createColumnSocketAction, deleteColumnSocketAction, setColumnsAction, updateColumnSocketAction } from '@redux/actions/columns.actions';
import { createFileSocketAction, deleteFileSocketAction, setFilesAction } from '@redux/actions/files.actions';
import { createTaskSocketAction, deleteTaskSocketAction, setTasksAction, updateTaskSocketAction } from '@redux/actions/tasks.actions';
import { BoardsState } from '@redux/state.models';
import * as utils from '../utils/utils';


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
  on(createBoardSocketAction, utils.addBoard),
  on(updateBoardSocketAction, utils.updateBoard),
  on(deleteBoardSocketAction, utils.deleteBoard),
  on(createColumnSocketAction, utils.addColumn),
  on(updateColumnSocketAction, utils.updateColumn),
  on(deleteColumnSocketAction, utils.deleteColumn),
  on(createTaskSocketAction, utils.addTask),
  on(updateTaskSocketAction, utils.updateTask),
  on(deleteTaskSocketAction, utils.deleteTask),
  on(createFileSocketAction, utils.addFile),
  on(deleteFileSocketAction, utils.deleteFile),
);


