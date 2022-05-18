import { createReducer, on } from '@ngrx/store';
import {
  addBoardsToStoreAction,
  clearCurrentBoardAction,
  deleteBoardsFromStoreAction,
  setBoardsAction,
  setCurrentBoardAction,
  updateBoardsInStoreAction,
} from '@redux/actions/boards.actions';
import { addColumnsToStoreAction, deleteColumnsFromStoreAction, setColumnsAction, updateColumnsInStoreAction } from '@redux/actions/columns.actions';
import { addFilesToStoreAction, deleteFilesFromStoreAction, setFilesAction, updateFilesInStoreAction } from '@redux/actions/files.actions';
import { addPointsToStoreAction, deletePointsFromStoreAction, setPointsAction, updatePointsInStoreAction } from '@redux/actions/points.actions';
import { setTasksAction, setLastCreatedTaskAction, clearLastCreatedTaskAction, addTasksToStoreAction, deleteTasksFromStoreAction, updateTasksInStoreAction } from '@redux/actions/tasks.actions';
import { BoardsState } from '@redux/state.models';



const initialState: BoardsState = {
  currentBoard: null,
  boards: [],
  columns: [],
  tasks: [],
  files: [],
  points: [],
  loaded: false,
  lastCreatedTask: null,
};



export const boardsReducer = createReducer(
  initialState,
  on(setCurrentBoardAction, (state, { id }) => ({ ...state, currentBoard: state.boards.find(board => board._id === id) || null })),
  on(setBoardsAction, (state, { boards }) => ({ ...state, boards, loaded: true })),
  on(setColumnsAction, (state, { columns }) => ({ ...state, columns })),
  on(setTasksAction, (state, { tasks }) => ({ ...state, tasks })),
  on(setFilesAction, (state, { files }) => ({ ...state, files })),
  on(setPointsAction, (state, { points }) => ({ ...state, points })),
  on(clearCurrentBoardAction, (state) => ({ ...state, currentBoard: null })),
  on(setLastCreatedTaskAction, (state, { task }) => ({ ...state, lastCreatedTask: task })),
  on(clearLastCreatedTaskAction, (state) => ({ ...state, lastCreatedTask: null })),
  on(addBoardsToStoreAction, (state, { boards }) => ({ ...state, boards: [...state.boards, ...boards] })),
  on(updateBoardsInStoreAction, (state, { boards }) => ({ ...state, boards: [...state.boards.filter(item => !boards.map(it => it._id).includes(item._id)), ...boards] })),
  on(deleteBoardsFromStoreAction, (state, { boards }) => ({ ...state, boards: [...state.boards.filter(item => !boards.map(it => it._id).includes(item._id))] })),
  on(addColumnsToStoreAction, (state, { columns }) => ({ ...state, columns: [...state.columns, ...columns] })),
  on(updateColumnsInStoreAction, (state, { columns }) => ({ ...state, columns: [...state.columns.filter(item => !columns.map(it => it._id).includes(item._id)), ...columns] })),
  on(deleteColumnsFromStoreAction, (state, { columns }) => ({ ...state, columns: [...state.columns.filter(item => !columns.map(it => it._id).includes(item._id))] })),
  on(addTasksToStoreAction, (state, { tasks }) => ({ ...state, tasks: [...state.tasks, ...tasks] })),
  on(updateTasksInStoreAction, (state, { tasks }) => ({ ...state, tasks: [...state.tasks.filter(item => !tasks.map(it => it._id).includes(item._id)), ...tasks] })),
  on(deleteTasksFromStoreAction, (state, { tasks }) => ({ ...state, tasks: [...state.tasks.filter(item => !tasks.map(it => it._id).includes(item._id))] })),
  on(addFilesToStoreAction, (state, { files }) => ({ ...state, files: [...state.files, ...files] })),
  on(updateFilesInStoreAction, (state, { files }) => ({ ...state, files: [...state.files.filter(item => !files.map(it => it._id).includes(item._id)), ...files] })),
  on(deleteFilesFromStoreAction, (state, { files }) => ({ ...state, files: [...state.files.filter(item => !files.map(it => it._id).includes(item._id))] })),
  on(addPointsToStoreAction, (state, { points }) => ({ ...state, points: [...state.points, ...points] })),
  on(updatePointsInStoreAction, (state, { points }) => ({ ...state, points: [...state.points.filter(item => !points.map(it => it._id).includes(item._id)), ...points] })),
  on(deletePointsFromStoreAction, (state, { points }) => ({ ...state, points: [...state.points.filter(item => !points.map(it => it._id).includes(item._id))] })),
);


