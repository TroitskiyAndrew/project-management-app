import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeTaskModalAction } from '@redux/actions/modals.actions';
import { AppState } from '@redux/state.models';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent implements OnInit {
  // private isOpened$ = this.store.select(editTaskSelector);

  public isOpened: boolean = false;

  constructor(private store: Store<AppState>) {
    this.close = this.close.bind(this);
  }

  ngOnInit(): void {
    // this.isOpened$.subscribe((value) => {
    //   this.isOpened = value;
    // });
  }

  close(): void {
    this.store.dispatch(closeTaskModalAction());
  }
}
