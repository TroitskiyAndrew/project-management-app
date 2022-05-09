import { NewTaskModel, TaskModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';
import { NotifyCallBack } from '@core/models/common.model';

export const createTaskAction = createAction('[tasks] create', props<{ newTask: NewTaskModel }>());
export const getTasksAction = createAction('[tasks] get');
export const setTasksAction = createAction('[tasks] set', props<{ tasks: TaskModel[] }>());
export const deleteTaskAction = createAction('[tasks] delete', props<{ id: string }>());
export const updateTaskAction = createAction('[tasks] update', props<{ newParams: NewTaskModel, id: string }>());
export const updateSetOfTasksAction = createAction('[tasks] update set', props<{ tasks: TaskModel[] }>());

export const createTaskSocketAction = createAction('[socket][tasks] create', props<{ task: TaskModel, _notifCallBack: NotifyCallBack }>());
export const updateTaskSocketAction = createAction('[socket][tasks] update', props<{ task: TaskModel, _notifCallBack: NotifyCallBack }>());
export const deleteTaskSocketAction = createAction('[socket][tasks] delete', props<{ task: TaskModel, _notifCallBack: NotifyCallBack }>());
