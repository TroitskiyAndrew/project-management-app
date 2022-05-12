import { Injectable } from '@angular/core';
import { FileModel } from '@shared/models/board.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { deleteFileAction, getFilesAction, setFilesAction, uplodFileAction } from '@redux/actions/files.actions';
import { FilesService } from '@core/services/files.service';


@Injectable()
export class FilesEffects {

  constructor(private actions$: Actions, private filesService: FilesService, private store$: Store<AppState>) { }

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uplodFileAction),
      switchMap((action) => {
        return this.filesService.uploadFile({ ...action.newFile });
      }),
    ), { dispatch: false },
  );

  getFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilesAction),
      switchMap((action: any) => this.filesService.getFiles(action.boards).pipe(
        map((result: FileModel[] | null) => {
          if (result) {
            this.store$.dispatch(setFilesAction({ files: result }));
          }
        }),
      )),
    ), { dispatch: false },
  );

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFileAction),
      switchMap((action) => this.filesService.deleteFile(action.id)),
    ), { dispatch: false },
  );

}
