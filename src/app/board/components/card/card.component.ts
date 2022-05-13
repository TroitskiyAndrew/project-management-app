import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmService } from '@core/services/confirm.service';
import { Store } from '@ngrx/store';
import { deleteTaskAction, updateTaskAction } from '@redux/actions/tasks.actions';
import { selectAllUsers } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { NewTaskModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() task!: TaskModel;

  public taskCreator!: IUser[];

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private confirmService: ConfirmService,
  ) {}

  ngOnInit(): void {
    this.store.select(selectAllUsers).subscribe((users) => {
      this.taskCreator = users.filter((user) => user._id === this.task.userId);
    });
  }

  openEditTaskModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      panelClass: 'dialog__panel',
      hasBackdrop: true,
      autoFocus: false,
      data: {
        title: this.task.title,
        description: this.task.description,
        users: this.task.users,
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const newTask: NewTaskModel = {
          ...res,
          boardId: this.task.boardId,
          order: this.task.order,
          columnId: this.task.columnId,
          userId: this.task.userId,
        };

        this.store.dispatch(updateTaskAction({ newParams: newTask, id: this.task._id }));
      }
    });
  }

  deleteTask(): void {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store.dispatch(deleteTaskAction({ id: this.task._id }));
      }
    });
  }
}
