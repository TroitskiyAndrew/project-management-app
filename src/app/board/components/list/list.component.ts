import { Component, Input } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import {
  deleteColumnAction,
  updateColumnAction,
} from '@redux/actions/columns.actions';
import { AppState } from '@redux/state.models';
import { ColumnModel, NewColumnModel } from '@shared/models/board.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() column!: ColumnModel;

  isEditable: boolean = false;

  constructor(
    private store: Store<AppState>,
    private confirmService: ConfirmService,
    private portalService: PortalService,
  ) {}

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
