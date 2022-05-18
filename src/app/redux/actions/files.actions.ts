import { NewFileModel, FileModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';

export const uplodFileAction = createAction('[files] upload', props<{ newFile: NewFileModel }>());
export const getAllFilesAction = createAction('[files] get all');
export const setFilesAction = createAction('[files] set', props<{ files: FileModel[] }>());
export const deleteFileAction = createAction('[files] delete', props<{ id: string }>());

export const addFilesToStoreAction = createAction('[files][store] add', props<{ files: FileModel[] }>());
export const updateFilesInStoreAction = createAction('[files][store] update', props<{ files: FileModel[] }>());
export const deleteFilesFromStoreAction = createAction('[files][store] delete', props<{ files: FileModel[] }>());

export const addFilesSocketAction = createAction('[socket][files] add', props<{ ids: string[], notify: boolean, initUser: string }>());
export const deleteFilesSocketAction = createAction('[socket][files] delete', props<{ ids: string[] }>());
