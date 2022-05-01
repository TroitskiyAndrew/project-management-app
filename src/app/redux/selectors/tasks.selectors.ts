import { createFeatureSelector } from '@ngrx/store';
import { BoardsState } from '@redux/state.models';

export const boardsSelector = createFeatureSelector<BoardsState>('boards');
