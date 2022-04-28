import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  closeBoardModalAction,
  closeTaskModalAction,
  openBoardModalAction,
  openTaskModalAction,
} from '@redux/actions/modals.actions';
import { ModalsState } from '@redux/state.models';

const initialState: ModalsState = {
  createBoard: false,
  createTask: false,
};

export const modalsReducer = createReducer(
  initialState,
  on(openBoardModalAction, (state) => {
    return { ...state, createBoard: true };
  }),
  on(closeBoardModalAction, (state) => {
    return { ...state, createBoard: false };
  }),
  on(openTaskModalAction, (state) => {
    return { ...state, createTask: true };
  }),
  on(closeTaskModalAction, (state) => {
    return { ...state, createTask: false };
  }),
);
