import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { createBoardAction } from '@redux/actions/boards.actions';
import { AppState } from '@redux/state.models';
import { PortalService } from '@core/services/portal.service';
import {
  selectAllUsersExceptCurrent,
  selectCurrentUser,
} from '@redux/selectors/users.selectors';
import {
  Subject,
  takeUntil,
} from 'rxjs';
import { IUser } from '@shared/models/user.model';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { NewBoardModel } from '@shared/models/board.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board-modal.component.html',
  styleUrls: ['./new-board-modal.component.scss'],
})
export class NewBoardModalComponent implements OnInit, OnDestroy {

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  private destroy$ = new Subject<void>();

  public allAvailableUsers!: IUser[];

  public createBoardForm!: FormGroup;

  private currentUser!: IUser;

  public dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
  ) { }

  get usersControl(): FormControl {
    return this.createBoardForm.get('users') as FormControl;
  }

  ngOnInit(): void {
    this.createBoardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      users: [[]],
    });
    this.store$
      .select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
        }
        this.createBoardForm.controls['owner'].setValue(this.currentUser._id);
      });
    this.store$.select(selectAllUsersExceptCurrent).pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.allAvailableUsers = users;
    });
  }

  onSubmit(): void {
    const titleCntr = this.createBoardForm.get('title') as FormControl;
    const newBoard: NewBoardModel = {
      title: titleCntr.value,
      owner: this.currentUser._id,
      users: this.createBoardForm.controls['users'].value.map((item: IUser) => item._id),
    };

    this.store$.dispatch(
      createBoardAction({ newBoard: newBoard }),
    );
    this.portalService.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
