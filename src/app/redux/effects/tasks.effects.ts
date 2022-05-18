import { Injectable } from '@angular/core';
import { TaskModel } from '@shared/models/board.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { createTaskAction, getAllTasksAction, setTasksAction, deleteTaskAction, updateTaskAction, updateSetOfTasksAction, setLastCreatedTaskAction, clearLastCreatedTaskAction, addTasksToStoreAction, deleteTasksFromStoreAction, updateTasksInStoreAction } from '@redux/actions/tasks.actions';
import { TasksService } from '@core/services/tasks.service';
import { errorResponseAction } from '@redux/actions/api-respone.actions';


@Injectable()
export class TasksEffects {

  constructor(private actions$: Actions, private tasksService: TasksService, private store$: Store<AppState>) { }

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
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskAction),
      switchMap((action) => this.tasksService.deleteTask(action.id).pipe(
        map((task) => deleteTasksFromStoreAction({ tasks: [task] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskAction),
      switchMap((action) => this.tasksService.updateTask({ ...action.newParams }, action.id).pipe(
        map((task) => updateTasksInStoreAction({ tasks: [task] })),
        catchError((error) => of(errorResponseAction({ error: error.error })),
        )))),
  );

  updateSetOfTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfTasksAction),
      switchMap((action) => this.tasksService.updateSetOfTask(action.tasks).pipe(
        map((tasks) => updateTasksInStoreAction({ tasks })),
        catchError(() => of(getAllTasksAction()),
        )))),
  );
}
