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
import { Observable, Subject, takeUntil } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { selectCurrentUserId, selectUsersByIdsExceptCurrent } from '@redux/selectors/users.selectors';
import { IUser } from '@shared/models/user.model';
import { PortalData } from '@core/models/common.model';
import { PortalService } from '@core/services/portal.service';
import { ColumnModel, NewTaskModel, TaskModel } from '@shared/models/board.model';
import { tasksByColumnSelector, usersByBoardIdSelector } from '@redux/selectors/boards.selectors';
import { createTaskAction, updateTaskAction } from '@redux/actions/tasks.actions';

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

  public task!: TaskModel | null;

  public column: ColumnModel | null = this.data['column'] as ColumnModel || null;

  private order!: number;

  private currentUserId!: string;

  public availableUsers$!: Observable<IUser[]>;

  public title!: string;

  public button!: string;

  private modal: boolean = this.data['modal'] as boolean || true;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
  ) { }

  ngOnInit(): void {
    this.task = this.data['task'] as TaskModel || null;

    if (this.task) {
      this.selectedUsers = [...this.task.users];
      this.title = 'taskModal.editMode.title';
      this.button = 'taskModal.editMode.button';
    } else if (this.column) {
      this.title = 'taskModal.createMode.title';
      this.button = 'taskModal.createMode.button';
      this.store$.select(tasksByColumnSelector(this.column._id)).pipe(takeUntil(this.destroy$)).subscribe(
        (tasks) => this.order = tasks.length + 1,
      );
    }
    this.store$.select(usersByBoardIdSelector(this.task?.boardId || this.column?.boardId || '')).pipe(takeUntil(this.destroy$)).subscribe(
      (users) => this.availableUsers$ = this.store$.select(selectUsersByIdsExceptCurrent(users)),
    );
    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(
      (id) => this.currentUserId = id as string,
    );


    this.taskForm = this.formBuilder.group({
      title: [this.task ? this.task.title : '', [Validators.required]],
      description: [this.task ? this.task.description : '', [Validators.required]],
      users: [['']],
    });
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
    if (this.task) {
      const newParams: NewTaskModel = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        users: this.selectedUsers,
        order: this.task.order,
        columnId: this.task.columnId,
        boardId: this.task.boardId,
        userId: this.task.userId,
      };
      this.store$.dispatch(updateTaskAction({ newParams, id: this.task._id }));
    } else if (this.column) {
      const newTask: NewTaskModel = {
        ...this.taskForm.value,
        users: this.selectedUsers,
        userId: this.currentUserId,
        order: this.order,
        columnId: this.column._id,
        boardId: this.column.boardId,
      };
      this.store$.dispatch(createTaskAction({ newTask }));
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
