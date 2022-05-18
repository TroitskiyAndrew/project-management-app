import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
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
  selectAllUsers,
  selectCurrentUser,
} from '@redux/selectors/users.selectors';
import {
  BehaviorSubject,
  combineLatest,
  first,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { IUser } from '@shared/models/user.model';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { NewBoardModel } from '@shared/models/board.model';

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board-modal.component.html',
  styleUrls: ['./new-board-modal.component.scss'],
})
export class NewBoardModalComponent implements OnInit, OnDestroy {
  @ViewChild('memberCtrl') memberCtrl!: ElementRef<HTMLInputElement>;

  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  private destroy$ = new Subject<void>();

  public selectedUsers$ = new BehaviorSubject<string[]>([]);

  public availableUsers$!: Observable<IUser[]>;

  public createBoardForm!: FormGroup;

  private currentUser!: IUser;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
  ) {}

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

    this.availableUsers$ = this.getAvailableUserObs();
  }

  private getAvailableUserObs() {
    return this.store$.select(selectAllUsers).pipe(
      switchMap((users) =>
        combineLatest([
          this.selectedUsers$,
          this.usersControl.valueChanges.pipe(startWith({ name: '' })),
        ]).pipe(
          map(([selectedUsernames, usersControValue]) =>
            users
              .filter(
                (user) => !selectedUsernames.find((name) => name === user.name),
              )
              .filter((user) =>
                user.name.toLowerCase().includes((usersControValue?.name || '').toLowerCase()),
              ),
          ),
          shareReplay(),
        ),
      ),
    );
  }

  private clearInput() {
    this.memberCtrl.nativeElement.value = '';
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    this.availableUsers$
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((users) => {
        const matchedAvailableUsers = users.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase()),
        );
        if (matchedAvailableUsers.length === 1) {
          this.selectedUsers$.next([
            ...this.selectedUsers$.value,
            matchedAvailableUsers[0].name,
          ]);
          this.clearInput();
        }

      });
  }

  remove(user: string): void {
    this.selectedUsers$.next(
      this.selectedUsers$.value.filter((selectedUser) => selectedUser !== user),
    );
    this.autocomplete.closePanel();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newUser = event.option.viewValue;
    this.selectedUsers$.next([...this.selectedUsers$.value, newUser]);

    this.clearInput();
  }

  onSubmit(): void {
    const titleCntr = this.createBoardForm.get('title') as FormControl;
    const newBoard: NewBoardModel = {
      title: titleCntr.value,
      owner: this.currentUser._id,
      users: this.selectedUsers$.value,
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
