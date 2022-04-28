import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeBoardModalAction } from '@redux/actions/modals.actions';
import { createBoardSelector } from '@redux/selectors/modals.selectors';
import { AppState } from '@redux/state.models';

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board-modal.component.html',
  styleUrls: ['./new-board-modal.component.scss'],
})
export class NewBoardModalComponent implements OnInit {
  private isOpened$ = this.store.select(createBoardSelector);

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
    this.store.dispatch(closeBoardModalAction());
  }
}
