import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  deleteBoardAction,
  errorCreateBoardAction,
  getBoardsAction,
  updateBoardAction,
  successGetBoardsAction,
} from '@redux/actions/tasks.actions';
import { TasksState } from '@redux/state.models';
import { BoardModel } from 'src/app/tasks/models/boardModel';

const initialState: TasksState = {
  boards: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(successGetBoardsAction, (state, { boards }) => {
    return { ...state, boards };
  }),
  // on(updateBoardAction, (state) => state),
  // on(deleteBoardAction, (state) => state),
);
