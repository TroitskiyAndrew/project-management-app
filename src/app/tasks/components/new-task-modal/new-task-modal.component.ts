import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeTaskModalAction } from '@redux/actions/modals.actions';
import { createTaskSelector } from '@redux/selectors/modals.selectors';
import { AppState } from '@redux/state.models';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
})
export class NewTaskModalComponent implements OnInit {
  private isOpened$ = this.store.select(createTaskSelector);

  public isOpened: boolean = false;

  constructor(private store: Store<AppState>) {
    this.close = this.close.bind(this);
  }

  ngOnInit(): void {
    this.isOpened$.subscribe((value) => {
      this.isOpened = value;
    });
  }

  close(): void {
    this.store.dispatch(closeTaskModalAction());
  }
}
