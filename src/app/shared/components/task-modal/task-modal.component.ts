import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  Subscription,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import {
  selectCurrentUserId,
  selectUsersByIds,
} from '@redux/selectors/users.selectors';
import { IUser } from '@shared/models/user.model';
import { PortalData } from '@core/models/common.model';
import { PortalService } from '@core/services/portal.service';
import {
  ColumnModel,
  NewPointModel,
  PointModel,
  TaskModel,
} from '@shared/models/board.model';
import {
  lastCreatedTask,
  pointsByTaskSelector,
  usersByBoardIdSelector,
} from '@redux/selectors/boards.selectors';
import { TasksService } from '@core/services/tasks.service';
import { createPointAction } from '@redux/actions/points.actions';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @ViewChild('memberCtrl') memberCtrl!: ElementRef<HTMLInputElement>;

  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  public taskForm!: FormGroup;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedUsers$ = new BehaviorSubject<string[]>([]);

  private data: PortalData = this.portalService.data || {};

  public task!: TaskModel;

  public column!: ColumnModel;

  public availableUsers$!: Observable<IUser[]>;

  public title!: string;

  public button!: string;

  public checklistActions: boolean = false;

  public points!: PointModel[];

  private modal: boolean = (this.data['modal'] as boolean) || true;

  private createMode!: boolean;

  private pointsSubs!: Subscription;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
    private taskService: TasksService,
  ) {}

  get usersControl(): FormControl {
    return this.taskForm.get('users') as FormControl;
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      users: [['']],
      userId: [''],
    });
    this.createMode = Boolean(this.data['column']);

    if (this.createMode) {
      this.column = this.data['column'] as ColumnModel;
      this.availableUsers$ = this.getAvailableUserObs(this.column.boardId);
      this.title = 'taskModal.createMode.title';
      this.button = 'taskModal.createMode.button';
    } else {
      if (this.data['task']) {
        this.useTask((this.data['task'] as TaskModel) || null);
      } else {
        (this.data['taskSubject'] as Subject<TaskModel>).subscribe((task) => {
          this.useTask(task);
        });
      }
      this.title = 'taskModal.editMode.title';
      this.button = 'taskModal.editMode.button';
    }
    this.store$
      .select(selectCurrentUserId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        this.taskForm.controls['users'].setValue([id]);
        this.taskForm.controls['userId'].setValue(id);
      });
  }

  private getAvailableUserObs(boardId: string) {
    return this.store$
      .select(usersByBoardIdSelector(boardId))
      .pipe(
        switchMap((users) =>
          combineLatest([
            this.store$.select(selectUsersByIds(users)),
            this.selectedUsers$,
            this.usersControl.valueChanges.pipe(startWith({ name: '' })),
          ]).pipe(
            map(([availableUsers, selectedUsernames, usersControValue]) =>
              availableUsers.filter(
                (user) => !selectedUsernames.find((name) => name === user.name),
              ).filter(
                (user) => user.name.toLowerCase().includes((usersControValue?.name || '').toLowerCase()),
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

  useTask(task: TaskModel | null): void {
    if (task === null) {
      return;
    }
    this.task = task;
    this.taskForm.controls['title'].setValue(task.title);
    this.taskForm.controls['description'].setValue(task.description);
    this.selectedUsers$.next([...task.users]);
    this.availableUsers$ = this.getAvailableUserObs(this.task.boardId);

    if (this.pointsSubs) {
      this.pointsSubs.unsubscribe();
    }
    this.pointsSubs = this.store$
      .select(pointsByTaskSelector(task._id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((points) => (this.points = points));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    this.availableUsers$.pipe(first(), takeUntil(this.destroy$)).subscribe(users => {
      const matchedAvailableUsers = users.filter((user) => user.name.toLowerCase().includes(value.toLowerCase()));
      if (matchedAvailableUsers.length === 1) {
        this.selectedUsers$.next([...this.selectedUsers$.value, matchedAvailableUsers[0].name]);
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

  onSubmit() {
    if (this.createMode) {
      this.taskService.createTaskFromModal(
        this.column,
        this.taskForm.value,
        this.selectedUsers$.value,
      );
    } else {
      this.taskService.updateTaskFromModal(
        this.task,
        this.taskForm.value,
        this.selectedUsers$.value,
      );
    }
    if (this.modal) {
      this.portalService.close();
    }
  }

  showCheckboxConstructor() {
    this.checklistActions = true;
  }

  @ViewChild('checkboxTitle') checkboxInput: any;

  addPoint(val: string) {
    if (val.trim()) {
      const point: NewPointModel = {
        title: val,
        taskId: this.task._id,
        boardId: this.task.boardId,
        done: false,
      };

      this.store$.dispatch(createPointAction({ newPoint: point }));
    }
    this.checkboxInput.nativeElement.value = '';
    this.checklistActions = false;
  }

  saveAndEdit(): void {
    if (this.taskForm.invalid) {
      return;
    }
    this.taskService.createTaskFromModal(
      this.column,
      this.taskForm.value,
      this.selectedUsers$.value,
    );
    this.store$
      .select(lastCreatedTask)
      .pipe(
        filter((val) => Boolean(val)),
        take(1),
      )
      .subscribe((task) => {
        this.title = 'taskModal.editMode.title';
        this.button = 'taskModal.editMode.button';
        this.createMode = false;
        this.useTask(task);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
