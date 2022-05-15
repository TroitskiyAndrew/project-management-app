import { Component, Input, OnInit } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { deleteTaskAction } from '@redux/actions/tasks.actions';
import { selectAllUsers } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { TaskModalComponent } from '../../../shared/components/task-modal/task-modal.component';

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
    public portalService: PortalService,
    private confirmService: ConfirmService,
  ) { }

  ngOnInit(): void {
    this.store.select(selectAllUsers).subscribe((users) => {
      this.taskCreator = users.filter((user) => user._id === this.task.userId);
    });
  }

  openEditTaskModal() {
    this.portalService.openComponent(TaskModalComponent, { task: this.task });
  }

  deleteTask(): void {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store.dispatch(deleteTaskAction({ id: this.task._id }));
      }
    });
  }
}
