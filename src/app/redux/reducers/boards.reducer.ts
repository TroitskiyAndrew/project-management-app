import { createReducer, on } from '@ngrx/store';
import {
  addBoardsToStoreAction,
  clearCurrentBoardAction,
  deleteBoardAction,
  deleteBoardsFromStoreAction,
  deleteBoardsSocketAction,
  setBoardsAction,
  setCurrentBoardAction,
  updateBoardAction,
  updateBoardsInStoreAction,
} from '@redux/actions/boards.actions';
import { addColumnsToStoreAction, deleteColumnAction, deleteColumnsFromStoreAction, deleteColumnsSocketAction, setColumnsAction, updateColumnAction, updateColumnsInStoreAction } from '@redux/actions/columns.actions';
import { addFilesToStoreAction, deleteFileAction, deleteFilesFromStoreAction, deleteFilesSocketAction, setFilesAction, updateFilesInStoreAction } from '@redux/actions/files.actions';
import { addPointsToStoreAction, deletePointAction, deletePointsFromStoreAction, deletePointsSocketAction, setPointsAction, updatePointAction, updatePointsInStoreAction } from '@redux/actions/points.actions';
import { setTasksAction, setLastCreatedTaskAction, clearLastCreatedTaskAction, addTasksToStoreAction, deleteTasksFromStoreAction, updateTasksInStoreAction, deleteTasksSocketAction, updateTaskAction, deleteTaskAction } from '@redux/actions/tasks.actions';
import { BoardsState } from '@redux/state.models';
import { BoardModel, ColumnModel, PointModel, TaskModel } from '@shared/models/board.model';



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
  on(updateBoardsInStoreAction, (state, { boards }) => {
    const newState = { ...state, boards: [...state.boards.filter(item => !boards.map(it => it._id).includes(item._id)), ...boards] };
    if (boards.map(item => item._id).includes(state.currentBoard?._id || '')) {
      newState.currentBoard = boards.find(item => item._id === state.currentBoard?._id || '') as BoardModel;
    }
    return newState;
  }),
  on(updateBoardAction, (state, { newParams, id }) => {
    const newState = { ...state, boards: [...state.boards.filter(item => item._id !== id), { ...state.boards.find(item => item._id === id) as BoardModel, ...newParams }] };
    if (id === state.currentBoard?._id || '') {
      newState.currentBoard = {
        ...newState.currentBoard as BoardModel,
        ...newParams,
      };
    }
    return newState;
  }),
  on(deleteBoardAction, (state, { id }) => ({ ...state, boards: [...state.boards.filter(item => item._id !== id)] })),
  on(deleteBoardsFromStoreAction, (state, { boards }) => ({ ...state, boards: [...state.boards.filter(item => !boards.map(it => it._id).includes(item._id))] })),
  on(deleteBoardsSocketAction, (state, { ids }) => ({ ...state, boards: [...state.boards.filter(item => !ids.includes(item._id))] })),
  on(addColumnsToStoreAction, (state, { columns }) => ({ ...state, columns: [...state.columns, ...columns] })),
  on(updateColumnsInStoreAction, (state, { columns }) => ({ ...state, columns: [...state.columns.filter(item => !columns.map(it => it._id).includes(item._id)), ...columns] })),
  on(updateColumnAction, (state, { newParams, id }) => ({ ...state, columns: [...state.columns.filter(item => item._id !== id), { ...state.columns.find(item => item._id === id) as ColumnModel, ...newParams }] })),
  on(deleteColumnAction, (state, { id }) => ({ ...state, columns: [...state.columns.filter(item => item._id !== id)] })),
  on(deleteColumnsFromStoreAction, (state, { columns }) => ({ ...state, columns: [...state.columns.filter(item => !columns.map(it => it._id).includes(item._id))] })),
  on(deleteColumnsSocketAction, (state, { ids }) => ({ ...state, columns: [...state.columns.filter(item => !ids.includes(item._id))] })),
  on(addTasksToStoreAction, (state, { tasks }) => ({ ...state, tasks: [...state.tasks, ...tasks] })),
  on(updateTasksInStoreAction, (state, { tasks }) => ({ ...state, tasks: [...state.tasks.filter(item => !tasks.map(it => it._id).includes(item._id)), ...tasks] })),
  on(updateTaskAction, (state, { newParams, id }) => ({ ...state, tasks: [...state.tasks.filter(item => item._id !== id), { ...state.tasks.find(item => item._id === id) as TaskModel, ...newParams }] })),
  on(deleteTaskAction, (state, { id }) => ({ ...state, tasks: [...state.tasks.filter(item => item._id !== id)] })),
  on(deleteTasksFromStoreAction, (state, { tasks }) => ({ ...state, tasks: [...state.tasks.filter(item => !tasks.map(it => it._id).includes(item._id))] })),
  on(deleteTasksSocketAction, (state, { ids }) => ({ ...state, tasks: [...state.tasks.filter(item => !ids.includes(item._id))] })),
  on(addFilesToStoreAction, (state, { files }) => ({ ...state, files: [...state.files, ...files] })),
  on(updateFilesInStoreAction, (state, { files }) => ({ ...state, files: [...state.files.filter(item => !files.map(it => it._id).includes(item._id)), ...files] })),
  on(deleteFileAction, (state, { id }) => ({ ...state, files: [...state.files.filter(item => item._id !== id)] })),
  on(deleteFilesFromStoreAction, (state, { files }) => ({ ...state, files: [...state.files.filter(item => !files.map(it => it._id).includes(item._id))] })),
  on(deleteFilesSocketAction, (state, { ids }) => ({ ...state, files: [...state.files.filter(item => !ids.includes(item._id))] })),
  on(addPointsToStoreAction, (state, { points }) => ({ ...state, points: [...state.points, ...points] })),
  on(updatePointsInStoreAction, (state, { points }) => ({ ...state, points: [...state.points.filter(item => !points.map(it => it._id).includes(item._id)), ...points] })),
  on(updatePointAction, (state, { newParams, id }) => ({ ...state, points: [...state.points.filter(item => item._id !== id), { ...state.points.find(item => item._id === id) as PointModel, ...newParams }] })),
  on(deletePointAction, (state, { id }) => ({ ...state, points: [...state.points.filter(item => item._id !== id)] })),
  on(deletePointsFromStoreAction, (state, { points }) => ({ ...state, points: [...state.points.filter(item => !points.map(it => it._id).includes(item._id))] })),
  on(deletePointsSocketAction, (state, { ids }) => ({ ...state, points: [...state.points.filter(item => !ids.includes(item._id))] })),
);


