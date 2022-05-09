import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { FileModel, NewFileModel } from '@shared/models/board.model';
import { catchError, Observable, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService implements OnDestroy {
  private currentBoardId!: string | null;

  private idSubs!: Subscription;

  constructor(private http: HttpClient, private store$: Store<AppState>) {
    this.idSubs = this.store$.select(currentBoardIdSelector).subscribe(id => {
      this.currentBoardId = id;
    });
  }

  public getOneFile(taskId: string, fileName: string): Observable<FileModel | null> {
    return this.http.get<FileModel>(`file/${taskId}/${fileName}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public getFiles(): Observable<FileModel[] | null> {
    return this.http.get<FileModel[]>(`file/${this.currentBoardId}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public uploadFile(body: NewFileModel): Observable<FileModel | null> {
    return this.http.post<FileModel>('file', body, { headers: { 'Accept': 'multipart/form-data' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public deleteFile(id: string): Observable<FileModel | null> {
    return this.http.delete<FileModel>(`file/${id}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
  }
}
