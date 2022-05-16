import { NewTaskModel, PointFace, TaskModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';
import { NotifyCallBack } from '@core/models/common.model';

export const createTaskAction = createAction('[tasks] create', props<{ newTask: NewTaskModel, newPoints: PointFace[] }>());
export const getTasksAction = createAction('[tasks] get', props<{ boards: string[] }>());
export const setTasksAction = createAction('[tasks] set', props<{ tasks: TaskModel[] }>());
export const deleteTaskAction = createAction('[tasks] delete', props<{ id: string }>());
export const updateTaskAction = createAction('[tasks] update', props<{ newParams: NewTaskModel, id: string }>());
export const updateSetOfTasksAction = createAction('[tasks] update set', props<{ tasks: TaskModel[] }>());

export const createTaskSocketAction = createAction('[socket][tasks] create', props<{ tasks: TaskModel[], _notifCallBack: NotifyCallBack }>());
export const updateTaskSocketAction = createAction('[socket][tasks] update', props<{ tasks: TaskModel[], _notifCallBack: NotifyCallBack }>());
export const deleteTaskSocketAction = createAction('[socket][tasks] delete', props<{ tasks: TaskModel[], _notifCallBack: NotifyCallBack }>());

export const setLastCreatedTaskAction = createAction('[tasks] last set', props<{ task: TaskModel }>());
export const clearLastCreatedTaskAction = createAction('[tasks] last clear');
