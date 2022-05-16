import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { errorResponseAction, successResponseAction } from '@redux/actions/api-respone.actions';
import { createTaskAction, updateTaskAction } from '@redux/actions/tasks.actions';
import { currentBoardIdSelector, tasksByColumnSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { TaskModel, NewTaskModel, ColumnModel, TaskFormModel, PointFace } from '@shared/models/board.model';
import { Observable, catchError, of, tap, Subject, takeUntil, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {

  private destroy$ = new Subject<void>();

  private currentBoardId!: string | null;


  constructor(private http: HttpClient, private store$: Store<AppState>, private router: Router) {
    this.store$.select(currentBoardIdSelector).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentBoardId = id;
    });
  }

  public getTasks(boards: string[]): Observable<TaskModel[] | null> {
    return this.http.get<TaskModel[]>('tasksSet', { params: new HttpParams().set('boards', boards.join(', ')) }).pipe(
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

  public createTask(task: NewTaskModel, newPoints: PointFace[]): Observable<TaskModel | null> {
    const body = {
      ...task,
      newPoints,
    };
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
        this.router.navigate(['']);
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

  public createTaskFromModal(column: ColumnModel, formValue: TaskFormModel, users: string[], newPoints: PointFace[] = []): void {
    this.store$.select(tasksByColumnSelector(column._id)).pipe(take(1)).subscribe(
      (tasks) => {
        let order = 1;
        if (tasks.length > 0) {
          order = Math.max(...tasks.map(task => task.order));
        }
        const newTask: NewTaskModel = {
          ...formValue,
          users,
          order,
          columnId: column._id,
          boardId: column.boardId,
        };
        this.store$.dispatch(createTaskAction({ newTask, newPoints }));
      },
    );
  }

  public updateTaskFromModal(task: TaskModel, formValue: TaskFormModel, users: string[]): void {
    const newParams: NewTaskModel = {
      ...formValue,
      users,
      order: task.order,
      columnId: task.columnId,
      boardId: task.boardId,
    };
    this.store$.dispatch(updateTaskAction({ newParams, id: task._id }));

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
