import { Injectable } from '@angular/core';
import { FileModel } from '@shared/models/board.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { addFilesToStoreAction, deleteFileAction, deleteFilesFromStoreAction, getAllFilesAction, setFilesAction, uplodFileAction } from '@redux/actions/files.actions';
import { FilesService } from '@core/services/files.service';
import { errorResponseAction } from '@redux/actions/api-respone.actions';


@Injectable()
export class FilesEffects {

  constructor(private actions$: Actions, private filesService: FilesService, private store$: Store<AppState>) { }

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uplodFileAction),
      switchMap((action) => this.filesService.uploadFile({ ...action.newFile }).pipe(
        map((file) => addFilesToStoreAction({ files: [file] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  getFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllFilesAction),
      switchMap(() => this.filesService.getFilesByUser().pipe(
        map((files: FileModel[]) => setFilesAction({ files })),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFileAction),
      switchMap((action) => this.filesService.deleteFile(action.id).pipe(
        map((file) => deleteFilesFromStoreAction({ files: [file] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );
}
