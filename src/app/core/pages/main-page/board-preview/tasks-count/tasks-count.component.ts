import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tasksByColumnSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { ColumnModel, TaskModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-count',
  templateUrl: './tasks-count.component.html',
  styleUrls: ['./tasks-count.component.scss'],
})
export class TasksCountComponent implements OnInit {
  @Input() column!: ColumnModel;

  public tasks$!: Observable<TaskModel[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.tasks$ = this.store.select(tasksByColumnSelector(this.column._id));
  }

}
