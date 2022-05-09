import { Injectable } from '@angular/core';
import { TaskModel } from '@shared/models/board.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { createTaskAction, getTasksAction, setTasksAction, deleteTaskAction, updateTaskAction, updateSetOfTasksAction } from '@redux/actions/tasks.actions';
import { TasksService } from '@core/services/tasks.service';
import { getFilesAction } from '@redux/actions/files.actions';


@Injectable()
export class TasksEffects {

  constructor(private actions$: Actions, private tasksService: TasksService, private store$: Store<AppState>) { }

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTaskAction),
      switchMap((action) => {
        return this.tasksService.createTask({ ...action.newTask });
      }),
    ), { dispatch: false },
  );

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasksAction),
      switchMap(() => this.tasksService.getTasks().pipe(
        map((result: TaskModel[] | null) => {
          if (result) {
            this.store$.dispatch(setTasksAction({ tasks: result }));
            this.store$.dispatch(getFilesAction());
          }
        }),
      )),
    ), { dispatch: false },
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskAction),
      switchMap((action) => this.tasksService.deleteTask(action.id)),
    ), { dispatch: false },
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTaskAction),
      switchMap((action) => this.tasksService.updateTask({ ...action.newParams }, action.id)),
    ), { dispatch: false },
  );

  updateSetOfTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSetOfTasksAction),
      switchMap((action) => this.tasksService.updateSetOfTask(action.tasks)),
    ), { dispatch: false },
  );
}
