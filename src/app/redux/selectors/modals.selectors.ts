import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModalsState } from '@redux/state.models';

export const modalsSelector = createSelector(
  createFeatureSelector<ModalsState>('modals'),
  (value): ModalsState => {
    return value;
  },
);

export const createBoardSelector = createSelector(
  modalsSelector,
  (modals) => modals.createBoard,
);

export const createTaskSelector = createSelector(
  modalsSelector,
  (modals) => modals.createTask,
);
