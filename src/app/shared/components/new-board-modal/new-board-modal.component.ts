import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createBoardAction } from '@redux/actions/boards.actions';
import { AppState } from '@redux/state.models';
import { PortalService } from '@core/services/portal.service';

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board-modal.component.html',
  styleUrls: ['./new-board-modal.component.scss'],
})
export class NewBoardModalComponent implements OnInit {

  public createBoardForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
  ) { }

  ngOnInit(): void {
    this.createBoardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.store.dispatch(createBoardAction({ newBoard: this.createBoardForm.value }));
    this.portalService.close();
  }
}
