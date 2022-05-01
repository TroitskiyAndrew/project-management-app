import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  deleteBoardAction,
  errorCreateBoardAction,
  getBoardsAction,
  updateBoardAction,
  successGetBoardsAction,
} from '@redux/actions/tasks.actions';
import { BoardsState } from '@redux/state.models';
import { BoardModel } from 'src/app/tasks/models/boardModel';

const initialState: BoardsState = {
  boards: [],
};

export const boardsReducer = createReducer(
  initialState,
  on(successGetBoardsAction, (state, { boards }) => {
    return { ...state, boards };
  }),
  // on(updateBoardAction, (state) => state),
  // on(deleteBoardAction, (state) => state),
);
