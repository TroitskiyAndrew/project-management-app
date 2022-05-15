import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmService } from '@core/services/confirm.service';
import { Store } from '@ngrx/store';
import {
  deleteColumnAction,
  updateColumnAction,
} from '@redux/actions/columns.actions';
import { createTaskAction } from '@redux/actions/tasks.actions';
import {
  currentBoardIdSelector,
  tasksByColumnSelector,
} from '@redux/selectors/boards.selectors';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import {
  ColumnModel,
  NewColumnModel,
  NewTaskModel,
  TaskModel,
} from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() column!: ColumnModel;

  private destroy$ = new Subject<void>();

  private currentBoardId!: string;

  private taskOrder!: number;

  private tasks$!: Observable<TaskModel[]>;

  public tasks!: TaskModel[];

  public currentUser!: IUser | null | undefined;

  isEditable: boolean = false;

  constructor(
    private store$: Store<AppState>,
    private confirmService: ConfirmService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    console.log(this.column);
    this.tasks$ = this.store$.select(tasksByColumnSelector(this.column._id));
    this.tasks$.subscribe((value) => {
      this.tasks = value;
    });
    this.store$
      .select(currentBoardIdSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        if (id) {
          this.currentBoardId = id;
        }
      });
    this.store$
      .select(tasksByColumnSelector(this.column._id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.taskOrder = tasks.length;
      });
    this.store$
      .select(selectCurrentUser)
      .subscribe((res) => (this.currentUser = res));
  }

  openTaskModal(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      panelClass: 'dialog__panel',
      hasBackdrop: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const newTask: NewTaskModel = {
          ...res,
          boardId: this.currentBoardId,
          order: this.taskOrder,
          columnId: this.column._id,
          userId: this.currentUser?._id,
        };

        this.store$.dispatch(createTaskAction({ newTask }));
      }
    });
  }

  changeTitle(value: string) {
    const newParams: NewColumnModel = {
      boardId: this.column.boardId,
      order: this.column.order,
      title: value,
    };
    this.store$.dispatch(
      updateColumnAction({ newParams, id: this.column._id }),
    );
    this.isEditable = !this.isEditable;
  }

  deleteList() {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store$.dispatch(deleteColumnAction({ id: this.column._id }));
      }
    });
  }

  drop(event: CdkDragDrop<TaskModel[], any, any>): void {
    console.log('Previous container: ', event.previousContainer.id);
    console.log('Previous index: ', event.previousIndex);
    console.log('Current container: ', event.container.id);
    console.log('Current index: ', event.currentIndex);
  }
}
