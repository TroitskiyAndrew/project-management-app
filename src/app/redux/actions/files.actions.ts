import { NewFileModel, FileModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';
import { NotifyCallBack } from '@core/models/common.model';

export const uplodFileAction = createAction('[files] upload', props<{ newFile: NewFileModel }>());
export const getFilesAction = createAction('[files] get');
export const setFilesAction = createAction('[files] set', props<{ files: FileModel[] }>());
export const deleteFileAction = createAction('[files] delete', props<{ id: string }>());

export const createFileSocketAction = createAction('[socket][files] create', props<{ file: FileModel, _notifCallBack: NotifyCallBack }>());
export const deleteFileSocketAction = createAction('[socket][files] delete', props<{ file: FileModel, _notifCallBack: NotifyCallBack }>());
