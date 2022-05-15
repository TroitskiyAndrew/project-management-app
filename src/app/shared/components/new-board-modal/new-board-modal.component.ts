import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createBoardAction } from '@redux/actions/boards.actions';
import { AppState } from '@redux/state.models';
import { PortalService } from '@core/services/portal.service';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '@shared/models/user.model';

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board-modal.component.html',
  styleUrls: ['./new-board-modal.component.scss'],
})
export class NewBoardModalComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public createBoardForm!: FormGroup;

  private currentUser!: IUser;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
  ) { }

  ngOnInit(): void {
    this.createBoardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      users: [[]],
    });
    this.store$.select(selectCurrentUser).pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
      this.createBoardForm.controls['owner'].setValue(this.currentUser._id);
    });
  }

  onSubmit(): void {
    this.store$.dispatch(createBoardAction({ newBoard: this.createBoardForm.value }));
    this.portalService.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
