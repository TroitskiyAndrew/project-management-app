import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { selectCurrentUserId, selectUsersByIdsExceptCurrent } from '@redux/selectors/users.selectors';
import { IUser } from '@shared/models/user.model';
import { PortalData } from '@core/models/common.model';
import { PortalService } from '@core/services/portal.service';
import { ColumnModel, TaskModel } from '@shared/models/board.model';
import { usersByBoardIdSelector } from '@redux/selectors/boards.selectors';
import { TasksService } from '@core/services/tasks.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  @ViewChild('memberCtrl') memberCtrl!: ElementRef<HTMLInputElement>;

  public taskForm!: FormGroup;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedUsers: string[] = [];

  private data: PortalData = this.portalService.data || {};

  public task!: TaskModel;

  public column!: ColumnModel;

  public availableUsers$!: Observable<IUser[]>;

  public title!: string;

  public button!: string;

  private modal: boolean = this.data['modal'] as boolean || true;

  private createMode!: boolean;

  private usersSubs!: Subscription;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
    private taskService: TasksService,
  ) { }

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
      this.getAvailableUsers(this.column.boardId);
      this.title = 'taskModal.createMode.title';
      this.button = 'taskModal.createMode.button';
    } else {
      this.task = this.data['task'] as TaskModel;
      this.title = 'taskModal.editMode.title';
      this.button = 'taskModal.editMode.button';
      this.setValues(this.task);
    }
    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(
      (id) => {
        this.taskForm.controls['users'].setValue([id]);
        this.taskForm.controls['userId'].setValue(id);
      },
    );
  }

  setValues(task: TaskModel): void {
    this.taskForm.controls['title'].setValue(task.title);
    this.taskForm.controls['description'].setValue(task.description);
    this.selectedUsers = [...task.users];
    if (this.usersSubs) {
      this.usersSubs.unsubscribe();
    }
    this.usersSubs = this.getAvailableUsers(task.boardId);
  }

  getAvailableUsers(boardId: string): Subscription {
    return this.store$.select(usersByBoardIdSelector(boardId)).pipe(takeUntil(this.destroy$)).subscribe(
      (users) => this.availableUsers$ = this.store$.select(selectUsersByIdsExceptCurrent(users)),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedUsers.push(value);
    }
    event.chipInput!.clear();

    this.taskForm.controls['users'].setValue(null);
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
    this.taskForm.controls['users'].setValue(null);

  }

  onSubmit() {
    if (this.createMode) {
      this.taskService.createTaskFromModal(this.column, this.taskForm.value, this.selectedUsers);
    } else {
      this.taskService.updateTaskFromModal(this.task, this.taskForm.value, this.selectedUsers);
    }
    if (this.modal) {
      this.portalService.close();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
