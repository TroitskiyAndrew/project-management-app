import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteTaskAction } from '@redux/actions/tasks.actions';
import { selectAllUsers } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() task!: TaskModel;

  public taskCreator!: IUser[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(selectAllUsers).subscribe(users => {
      this.taskCreator = users.filter(user => user._id === this.task.userId);
    });
  }

  deleteTask(): void {
    this.store.dispatch(deleteTaskAction({ id: this.task._id }));
  }
}
