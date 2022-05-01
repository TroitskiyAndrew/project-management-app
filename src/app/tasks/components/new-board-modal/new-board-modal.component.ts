import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { closeBoardModalAction } from '@redux/actions/modals.actions';
import { createBoardAction } from '@redux/actions/boards.actions';
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

  public createBoardForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
  ) {
    this.close = this.close.bind(this);
    this.createBoardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isOpened$.subscribe((value) => {
      this.isOpened = value;
    });
  }

  close(): void {
    this.store.dispatch(closeBoardModalAction());
  }

  onSubmit(): void {
    if (this.createBoardForm.valid) {
      this.store.dispatch(createBoardAction(this.createBoardForm.value));
    }
  }
}
