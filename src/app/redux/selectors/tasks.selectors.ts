import { createFeatureSelector } from '@ngrx/store';
import { TasksState } from '@redux/state.models';

export const tasksSelector = createFeatureSelector<TasksState>('tasks')