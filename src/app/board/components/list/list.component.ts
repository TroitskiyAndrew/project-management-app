import { Component, Input, OnInit } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { Store } from '@ngrx/store';
import { deleteColumnAction, updateColumnAction } from '@redux/actions/columns.actions';
import { AppState } from '@redux/state.models';
import { ColumnModel, NewColumnModel } from '@shared/models/board.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() column!: ColumnModel;

  isEditable: boolean = false;

  constructor(private store: Store<AppState>, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    console.log('hello');
  }

  openTaskModal() { }

  changeTitle(value: string) {
    const newParams: NewColumnModel = {
      boardId: this.column.boardId,
      order: this.column.order,
      title: value,
    };
    this.store.dispatch(
      updateColumnAction({ newParams, id: this.column._id }),
    );
    this.isEditable = !this.isEditable;
  }

  deleteList() {
    this.confirmService.requestConfirm().subscribe(val => {
      if (val) {
        this.store.dispatch(deleteColumnAction({ id: this.column._id }));
      }
    });
  }
}
