import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { errorResponseAction, successResponseAction } from '@redux/actions/api-respone.actions';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { FileModel, NewFileModel } from '@shared/models/board.model';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService implements OnDestroy {

  private currentUserId!: string;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private store$: Store<AppState>) {
    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentUserId = id || '';
    });
  }

  public getOneFile(taskId: string, fileName: string): Observable<FileModel | null> {
    return this.http.get<FileModel>(`file/${taskId}/${fileName}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public getFilesByUser(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>('file', { params: new HttpParams().set('userId', this.currentUserId) });
  }

  public getFilesByIds(ids: string[]): Observable<FileModel[]> {
    return this.http.get<FileModel[]>('file', { params: new HttpParams().set('ids', ids.join(', ')) });
  }

  public uploadFile(body: NewFileModel): Observable<FileModel> {
    return this.http.post<FileModel>('file', body, { headers: { 'Accept': 'multipart/form-data' } }).pipe(
      tap((file) => this.store$.dispatch(successResponseAction({ message: file.name + ' ${notifications.file.create}' }))),
    );
  }

  public deleteFile(id: string): Observable<FileModel> {
    return this.http.delete<FileModel>(`file/${id}`).pipe(
      tap((file) => this.store$.dispatch(successResponseAction({ message: file.name + ' ${notifications.file.delete}' }))),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
