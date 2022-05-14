import { Component, Input, OnDestroy, OnInit  } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { Store } from '@ngrx/store';
import {
  deleteColumnAction,
  updateColumnAction,
} from '@redux/actions/columns.actions';
import { tasksByColumnSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { ColumnModel, NewColumnModel, TaskModel } from '@shared/models/board.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy{
  @Input() column!: ColumnModel;

  private destroy$ = new Subject<void>();

  public tasks$!: Observable<TaskModel[]>;

  isEditable: boolean = false;

  constructor(
    private store$: Store<AppState>,
    private confirmService: ConfirmService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.tasks$ =  this.store$.select(tasksByColumnSelector(this.column._id));
  }

  openTaskModal(): void {
    this.taskService.addTask(this.column).pipe(takeUntil(this.destroy$)).subscribe();
  }

  changeTitle(value: string) {
    const newParams: NewColumnModel = {
      boardId: this.column.boardId,
      order: this.column.order,
      title: value,
    };
    this.store$.dispatch(updateColumnAction({ newParams, id: this.column._id }));
    this.isEditable = !this.isEditable;
  }

  deleteList() {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store$.dispatch(deleteColumnAction({ id: this.column._id }));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
