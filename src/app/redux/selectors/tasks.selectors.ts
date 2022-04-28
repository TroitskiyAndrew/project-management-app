import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from '@redux/state.models';

export const tasksSelector = createSelector(
  createFeatureSelector<TasksState>('tasks'),
  (value): TasksState => {
    return value;
  },
);