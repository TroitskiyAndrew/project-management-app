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
import { createPointSocketAction, updatePointSocketAction, deletePointSocketAction } from '@redux/actions/points.actions';
import { createTaskSocketAction, deleteTaskSocketAction, setTasksAction, updateTaskSocketAction } from '@redux/actions/tasks.actions';
import { BoardsState } from '@redux/state.models';
import * as utils from '../utils/utils';


const initialState: BoardsState = {
  currentBoard: null,
  boards: [],
  columns: [],
  tasks: [],
  files: [],
  points: [],
  loaded: false,
};



export const boardsReducer = createReducer(
  initialState,
  on(setCurrentBoardAction, (state, { id }) => ({ ...state, currentBoard: state.boards.find(board => board._id === id) || null })),
  on(setBoardsAction, (state, { boards }) => ({ ...state, boards, loaded: true })),
  on(setColumnsAction, (state, { columns }) => ({ ...state, columns })),
  on(setTasksAction, (state, { tasks }) => ({ ...state, tasks })),
  on(setFilesAction, (state, { files }) => ({ ...state, files })),
  on(clearCurrentBoardAction, (state) => ({ ...state, currentBoard: null })),
  on(createBoardSocketAction, utils.addBoard),
  on(updateBoardSocketAction, utils.updateBoard),
  on(deleteBoardSocketAction, utils.deleteBoard),
  on(createColumnSocketAction, utils.addColumn),
  on(updateColumnSocketAction, utils.updateColumn),
  on(deleteColumnSocketAction, utils.deleteColumn),
  on(createTaskSocketAction, utils.addTask),
  on(updateTaskSocketAction, utils.updateTask),
  on(deleteTaskSocketAction, utils.deleteTask),
  on(createPointSocketAction, utils.addPoint),
  on(updatePointSocketAction, utils.updatePoint),
  on(deletePointSocketAction, utils.deletePoint),
  on(createFileSocketAction, utils.addFile),
  on(deleteFileSocketAction, utils.deleteFile),
);


