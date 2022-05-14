import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { Store } from '@ngrx/store';
import { deleteTaskAction } from '@redux/actions/tasks.actions';
import { selectAllUsers } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() task!: TaskModel;

  private destroy$ = new Subject<void>();

  public taskCreator!: IUser[];

  constructor(
    private store: Store<AppState>,
    private taskService: TaskService,
    private confirmService: ConfirmService,
  ) {}

  ngOnInit(): void {
    this.store.select(selectAllUsers).pipe(takeUntil(this.destroy$)).subscribe((users) => {
      this.taskCreator = users.filter((user) => user._id === this.task.userId);
    });
  }

  openEditTaskModal() {
    this.taskService.editTask(this.task).pipe(takeUntil(this.destroy$)).subscribe();
  }

  deleteTask(): void {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store.dispatch(deleteTaskAction({ id: this.task._id }));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
