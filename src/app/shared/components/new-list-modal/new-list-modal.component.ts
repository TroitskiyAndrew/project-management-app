import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { createColumnAction } from '@redux/actions/columns.actions';
import { AppState } from '@redux/state.models';

@Component({
  selector: 'app-new-list-modal',
  templateUrl: './new-list-modal.component.html',
  styleUrls: ['./new-list-modal.component.scss'],
})
export class NewListModalComponent implements OnInit {
  public createListForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
  ) {}

  ngOnInit(): void {
    this.createListForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      order: [1, [Validators.required]],
    });
  }

  onSubmit(): void {
    this.store.dispatch(
      createColumnAction({ newColumn: this.createListForm.value }),
    );
    this.portalService.close();
  }
}
