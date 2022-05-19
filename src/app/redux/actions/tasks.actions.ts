import { NewTaskModel, PointFace, TaskModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';

export const createTaskAction = createAction('[tasks] create', props<{ newTask: NewTaskModel, newPoints: PointFace[] }>());
export const getAllTasksAction = createAction('[tasks] get all');
export const setTasksAction = createAction('[tasks] set', props<{ tasks: TaskModel[] }>());
export const deleteTaskAction = createAction('[tasks] delete', props<{ id: string }>());
export const updateTaskAction = createAction('[tasks] update', props<{ newParams: NewTaskModel, id: string }>());
export const updateSetOfTasksAction = createAction('[tasks] update set', props<{ tasks: TaskModel[] }>());

export const addTasksToStoreAction = createAction('[tasks][store] add', props<{ tasks: TaskModel[] }>());
export const updateTasksInStoreAction = createAction('[tasks][store] update', props<{ tasks: TaskModel[] }>());
export const deleteTasksFromStoreAction = createAction('[tasks][store] delete', props<{ tasks: TaskModel[] }>());

export const addTasksSocketAction = createAction('[socket][tasks] add', props<{ ids: string[], notify: boolean, initUser: string }>());
export const updateTasksSocketAction = createAction('[socket][tasks] update', props<{ ids: string[] }>());
export const deleteTasksSocketAction = createAction('[socket][tasks] delete', props<{ ids: string[] }>());

export const setLastCreatedTaskAction = createAction('[tasks] last set', props<{ task: TaskModel }>());
export const clearLastCreatedTaskAction = createAction('[tasks] last clear');
