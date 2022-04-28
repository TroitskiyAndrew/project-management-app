import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from '@redux/state.models';

export const tasksSelector = createSelector(
  createFeatureSelector<TasksState>('modals'),
  (value): TasksState => {
    return value;
  },
);