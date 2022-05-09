import { createReducer, on } from '@ngrx/store';
import {
  setBoardsAction,
} from '@redux/actions/boards.actions';
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
  on(setBoardsAction, (state, { boards }) => {
    return { ...state, boards };
  }),
  // on(updateBoardAction, (state) => state),
  // on(deleteBoardAction, (state) => state),
);
