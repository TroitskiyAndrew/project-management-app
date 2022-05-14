import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  createTaskAction,
  updateTaskAction,
} from '@redux/actions/tasks.actions';
import {
  currentBoardIdSelector,
  tasksByColumnSelector,
} from '@redux/selectors/boards.selectors';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import {
  ColumnModel,
  NewTaskModel,
  TaskModel,
} from '@shared/models/board.model';
import { combineLatest, first, pluck, tap } from 'rxjs';
import { TaskModalComponent } from '../components/task-modal/task-modal.component';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly currentBoardId$ = this.store.select(currentBoardIdSelector);

  private readonly currentUser$ = this.store.select(selectCurrentUser);

  constructor(
    private readonly dialog: MatDialog,
    private store: Store<AppState>,
  ) {}

  addTask(column: ColumnModel) {
    const taskOrder$ = this.store
      .select(tasksByColumnSelector(column._id))
      .pipe(pluck('length'));

    const dialogRef = this.dialog.open(TaskModalComponent, {
      panelClass: 'dialog__panel',
      hasBackdrop: true,
      autoFocus: false,
    });

    return combineLatest([
      dialogRef.afterClosed(),
      this.currentBoardId$,
      taskOrder$,
      this.currentUser$,
    ]).pipe(
      first(),
      tap(([res, currentBoardId, taskOrder, currentUser]) => {
        if (res) {
          const newTask: NewTaskModel = {
            ...res,
            boardId: currentBoardId,
            order: taskOrder,
            columnId: column._id,
            userId: currentUser?._id,
          };

          this.store.dispatch(createTaskAction({ newTask }));
        }
      }),
    );
  }

  editTask(task: TaskModel) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      panelClass: 'dialog__panel',
      hasBackdrop: true,
      autoFocus: false,
      data: {
        title: task.title,
        description: task.description,
        users: task.users,
      },
    });

    return dialogRef.afterClosed().pipe(
      tap((res) => {
        if (res) {
          const editedTask: NewTaskModel = {
            ...res,
            boardId: task.boardId,
            order: task.order,
            columnId: task.columnId,
            userId: task.userId,
          };

          this.store.dispatch(
            updateTaskAction({ newParams: editedTask, id: task._id }),
          );
        }
      }),
    );
  }
}
