import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { successResponseAction } from '@redux/actions/api-respone.actions';
import { createTaskAction, updateTaskAction } from '@redux/actions/tasks.actions';
import { currentBoardIdSelector, tasksByColumnSelector } from '@redux/selectors/boards.selectors';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { TaskModel, NewTaskModel, ColumnModel, TaskFormModel, PointFace } from '@shared/models/board.model';
import { Observable, tap, Subject, takeUntil, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements OnDestroy {

  private destroy$ = new Subject<void>();

  private currentBoardId!: string | null;

  private currentUserId!: string;


  constructor(private http: HttpClient, private store$: Store<AppState>, private router: Router) {
    this.store$.select(currentBoardIdSelector).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentBoardId = id;
    });
    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentUserId = id || '';
    });
  }

  public getTasksByUser(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>('tasksSet', { params: new HttpParams().set('userId', this.currentUserId) });
  }

  public getTasksByIds(ids: string[]): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>('tasksSet', { params: new HttpParams().set('ids', ids.join(', ')) });
  }

  public createTask(newTask: NewTaskModel, newPoints: PointFace[]): Observable<TaskModel> {
    const body = {
      ...newTask,
      newPoints,
    };
    return this.http.post<TaskModel>(this.getUrl(body.columnId), body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((task) => this.store$.dispatch(successResponseAction({ message: task.title + ' ${notifications.task.create}' }))),
    );
  }

  public updateTask(body: NewTaskModel, id: string): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.getUrl(body.columnId)}/${id}`, body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((task) => this.store$.dispatch(successResponseAction({ message: task.title + ' ${notifications.task.update}' }))),
    );
  }

  public updateSetOfTask(tasks: TaskModel[]): Observable<TaskModel[]> {
    return this.http.patch<TaskModel[]>('tasksSet', { tasks }, { headers: { 'Content-Type': 'application/json' } });
  }

  public deleteTask(id: string): Observable<TaskModel> {
    return this.http.delete<TaskModel>(`${this.getUrl()}/${id}`).pipe(
      tap((task) => this.store$.dispatch(successResponseAction({ message: task.title + ' ${notifications.task.delete}' }))),
    );
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
      boardId: task.boardId,
    };
    this.store$.dispatch(updateTaskAction({ newParams, id: task._id }));

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
