import { Component, Input, OnInit } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import {
  deleteColumnAction,
  updateColumnAction,
} from '@redux/actions/columns.actions';
import { tasksByColumnSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { ColumnModel, NewColumnModel, TaskModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit{
  @Input() column!: ColumnModel;

  public tasks$!: Observable<TaskModel[]>;

  isEditable: boolean = false;

  constructor(
    private store: Store<AppState>,
    private confirmService: ConfirmService,
    private portalService: PortalService,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(tasksByColumnSelector(this.column._id));
  }

  openTaskModal(): void {
    this.portalService.openComponent(TaskModalComponent, {
      columnId: this.column._id,
    });
  }

  changeTitle(value: string) {
    const newParams: NewColumnModel = {
      boardId: this.column.boardId,
      order: this.column.order,
      title: value,
    };
    this.store.dispatch(updateColumnAction({ newParams, id: this.column._id }));
    this.isEditable = !this.isEditable;
  }

  deleteList() {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store.dispatch(deleteColumnAction({ id: this.column._id }));
      }
    });
  }
}
