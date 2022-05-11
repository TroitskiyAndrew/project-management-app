import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import {
  currentBoardIdSelector,
  tasksByColumnSelector,
} from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { Observable, Subject, takeUntil } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  selectAllUsers,
  selectCurrentUser,
} from '@redux/selectors/users.selectors';
import { IUser } from '@shared/models/user.model';
import { NewTaskModel } from '@shared/models/board.model';
import { createTaskAction } from '@redux/actions/tasks.actions';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit, OnDestroy {
  @ViewChild('memberCtrl')
    memberCtrl!: ElementRef<HTMLInputElement>;

  private destroy$ = new Subject<void>();

  public allUsers$: Observable<IUser[]> = this.store$.select(selectAllUsers);

  private columnId: string = this.portalService.data!['columnId'] as string;

  private currentUser$: Observable<IUser | null> = this.store$.select(selectCurrentUser);

  public createTaskForm!: FormGroup;

  private currentBoardId!: string;

  public currentUser!: IUser | null;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedUsers: string[] = [];

  private taskOrder!: number;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
  ) {}

  ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      users: [''],
    });
    this.store$
      .select(currentBoardIdSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        if (id) {
          this.currentBoardId = id;
        }
      });

    this.store$
      .select(tasksByColumnSelector(this.columnId))
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.taskOrder = tasks.length;
      });

    this.currentUser$.subscribe((res) => (this.currentUser = res));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedUsers.push(value);
    }
    event.chipInput!.clear();

    this.createTaskForm.controls['users'].setValue(null);
  }

  remove(user: string): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedUsers.indexOf(event.option.viewValue) === -1) {
      this.selectedUsers.push(event.option.viewValue);
    }
    this.memberCtrl.nativeElement.value = '';
    this.createTaskForm.controls['users'].setValue(null);
  }

  onSubmit(): void {
    const newTask: NewTaskModel = {
      ...this.createTaskForm.value,
      users: this.selectedUsers,
      boardId: this.currentBoardId,
      order: this.taskOrder,
      columnId: this.columnId,
      userId: this.currentUser?._id,
    };

    this.store$.dispatch(createTaskAction({ newTask }));
    this.portalService.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
