import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { errorResponseAction, successResponseAction } from '@redux/actions/api-respone.actions';
import { currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { TaskModel, NewTaskModel } from '@shared/models/board.model';
import { Subscription, Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {

  private currentBoardId!: string | null;

  private idSubs!: Subscription;

  constructor(private http: HttpClient, private store$: Store<AppState>) {
    this.idSubs = this.store$.select(currentBoardIdSelector).subscribe(id => {
      this.currentBoardId = id;
    });
  }

  public getTasks(): Observable<TaskModel[] | null> {
    return this.http.get<TaskModel[]>(`tasksSet/${this.currentBoardId}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public findTasks(request: string): Observable<TaskModel[] | null> {
    return this.http.get<TaskModel[]>(`tasksSet?search=${request}`).pipe(
      tap((tasks: TaskModel[]) => this.store$.dispatch(successResponseAction({ message: `Founded ${tasks.length} tasks` }))),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public createTask(body: NewTaskModel): Observable<TaskModel | null> {
    return this.http.post<TaskModel>(this.getUrl(body.columnId), body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public updateTask(body: NewTaskModel, id: string): Observable<TaskModel | null> {
    return this.http.put<TaskModel>(`${this.getUrl(body.columnId)}/${id}`, body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public updateSetOfTask(tasks: TaskModel[]): Observable<TaskModel[] | null> {
    return this.http.patch<TaskModel[]>('tasksSet', { tasks }, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public deleteTask(id: string): Observable<TaskModel | null> {
    return this.http.delete<TaskModel>(`${this.getUrl()}/${id}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  private getUrl(colimnId?: string): string {
    return `boards/${this.currentBoardId}/columns/${colimnId || 0}/tasks`;
  }

  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
  }
}
