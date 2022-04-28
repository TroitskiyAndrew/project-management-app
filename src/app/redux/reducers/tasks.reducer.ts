import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  deleteBoardAction,
  errorCreateBoardAction,
  getAllBoardsAction,
  getBoardByIdAction,
  succesCreateBoardAction,
  updateBoardAction,
} from '@redux/actions/tasks.actions';
import { TasksState } from '@redux/state.models';

const initialState: TasksState = {};

export const tasksReducer = createReducer(
  initialState,
  on(getAllBoardsAction, (state) => state),
  on(succesCreateBoardAction, (state) => state),
  on(errorCreateBoardAction, (state) => state),
  on(getBoardByIdAction, (state) => state),
  on(updateBoardAction, (state) => state),
  on(deleteBoardAction, (state) => state),
);
