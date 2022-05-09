import { NewFileModel, FileModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';

export const uplodFileAction = createAction('[files] upload', props<{ newFile: NewFileModel }>());
export const getFilesAction = createAction('[files] get');
export const setFilesAction = createAction('[files] set', props<{ files: FileModel[] }>());
export const deleteFileAction = createAction('[files] delete', props<{ id: string }>());
