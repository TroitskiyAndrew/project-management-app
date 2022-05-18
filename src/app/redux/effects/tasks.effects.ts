import { Injectable } from '@angular/core';
import { TaskModel } from '@shared/models/board.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { createTaskAction, getAllTasksAction, setTasksAction, deleteTaskAction, updateTaskAction, updateSetOfTasksAction, setLastCreatedTaskAction, clearLastCreatedTaskAction, addTasksToStoreAction, updateTasksInStoreAction, addTasksSocketAction, updateTasksSocketAction } from '@redux/actions/tasks.actions';
import { TasksService } from '@core/services/tasks.service';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { NotifService } from '@core/services/notif.service';


@Injectable()
export class TasksEffects {

  constructor(private actions$: Actions, private tasksService: TasksService, private store$: Store<AppState>, private notifier: NotifService) { }

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTaskAction),
      switchMap((action) => this.tasksService.createTask({ ...action.newTask }, action.newPoints).pipe(
        tap((task) => setLastCreatedTaskAction({ task })),
        map((task) => addTasksToStoreAction({ tasks: [task] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  clearLast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setLastCreatedTaskAction),
      map(() => clearLastCreatedTaskAction()),
    ),
  );

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTasksAction),
      switchMap(() => this.tasksService.getTasksByUser().pipe(
        map((result: TaskModel[]) => setTasksAction({ tasks: result })),
      )),
      catchError((error) => of(errorResponseAction({ error: error.error }))),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskAction),
      switchMap((action) => this.tasksService.deleteTask(action.id).pipe(
        catchError(() => {
          this.store$.dispatch(getAllTasksAction());
          return of();
        }),
      ))), { dispatch: false },
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskAction),
      switchMap((action) => this.tasksService.updateTask({ ...action.newParams }, action.id).pipe(
        catchError(() => {
          this.store$.dispatch(getAllTasksAction());
          return of();
        }),
      ))), { dispatch: false },
  );

  updateSetOfTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfTasksAction),
      tap(({ tasks }) => this.store$.dispatch(updateTasksInStoreAction({ tasks }))),
      switchMap((action) => this.tasksService.updateSetOfTask(action.tasks).pipe(
        catchError(() => {
          this.store$.dispatch(getAllTasksAction());
          return of();
        }),
      ))), { dispatch: false },
  );

  addTaskFromSocet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTasksSocketAction),
      switchMap((action) => this.tasksService.getTasksByIds(action.ids).pipe(
        map((tasks: TaskModel[]) => {
          if (action.notify) {
            this.notifier.notifyAboutSocket('task', 'add', action.ids, action.initUser);
          }
          return addTasksToStoreAction({ tasks });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

  editTaskFromSocet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTasksSocketAction),
      switchMap((action) => this.tasksService.getTasksByIds(action.ids).pipe(
        map((tasks: TaskModel[]) => {
          return updateTasksInStoreAction({ tasks });
        }),
        catchError((error) => of(errorResponseAction({ error: error.error }))),
      )),
    ),
  );

}
