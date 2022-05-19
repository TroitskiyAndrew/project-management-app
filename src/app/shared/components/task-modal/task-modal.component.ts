import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import {
  filter,
  Observable,
  Subject,
  Subscription,
  take,
  takeUntil,
} from 'rxjs';
import {
  selectCurrentUser,
  selectCurrentUserId,
  selectUsersByIds,
} from '@redux/selectors/users.selectors';
import { IUser } from '@shared/models/user.model';
import { PortalData } from '@core/models/common.model';
import { PortalService } from '@core/services/portal.service';
import {
  ColumnModel,
  FileModel,
  NewPointModel,
  PointFace,
  PointModel,
  TaskModel,
} from '@shared/models/board.model';
import {
  columnsByBoarIdSelector,
  filesByTaskSelector,
  isMember,
  lastCreatedTask,
  pointsByTaskSelector,
  usersInBoardSelector,
  usersInCurrentBoardSelector,
} from '@redux/selectors/boards.selectors';
import { TasksService } from '@core/services/tasks.service';
import { createPointAction } from '@redux/actions/points.actions';
import { uplodFileAction } from '@redux/actions/files.actions';
import { ConfirmService } from '@core/services/confirm.service';
import { NotifService } from '@core/services/notif.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public taskForm!: FormGroup;

  private data: PortalData = this.portalService.data || {};

  public task!: TaskModel;

  public column!: ColumnModel;

  public columns$!: Observable<ColumnModel[]>;

  public title!: string;

  public button!: string;

  public checklistActions: boolean = false;

  public points!: PointModel[];

  public futurePoints: PointFace[] = [];

  private modal: boolean = (this.data['modal'] as boolean) || true;

  public createMode!: boolean;

  private pointsSubs!: Subscription;

  private file!: File | null;

  public files!: FileModel[];

  private filesSubs!: Subscription;

  private uploadFileAfterSave = false;

  public allAvailableUsers: IUser[] = [];

  private usersSubs!: Subscription;

  public dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  public ownerName!: string;

  public canEditSubs!: Subscription;

  public canEdit = true;


  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
    private taskService: TasksService,
    private confirmService: ConfirmService,
    private notify: NotifService,
  ) { }


  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      users: [[]],
      userId: [''],
      columnId: [null],
    });
    this.createMode = Boolean(this.data['column']);


    if (this.createMode) {
      this.column = this.data['column'] as ColumnModel;
      this.title = 'taskModal.createMode.title';
      this.button = 'taskModal.createMode.button';
      this.usersSubs = this.store$
        .select(usersInCurrentBoardSelector)
        .pipe(takeUntil(this.destroy$))
        .subscribe((users) => this.allAvailableUsers = users);
      this.store$.select(selectCurrentUser).pipe(take(1)).subscribe(user => {
        this.ownerName = user?.name || '';
        this.taskForm.controls['userId'].setValue(user?._id || '');
      });

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
        this.taskForm.controls['userId'].setValue(id);
      });
  }

  useTask(task: TaskModel | null): void {
    if (task === null) {
      return;
    }
    if (this.usersSubs) {
      this.usersSubs.unsubscribe();
    }
    this.task = task;
    this.usersSubs = this.store$
      .select(usersInBoardSelector(task.boardId))
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.ownerName = users.find(item => item._id === this.task?.userId || '')?.name || '';
        this.allAvailableUsers = users;
      });
    this.store$.select(selectUsersByIds(task.users)).pipe(take(1)).subscribe(users => {
      this.taskForm.controls['users'].setValue(users);
    });

    this.taskForm.controls['title'].setValue(task.title);
    this.taskForm.controls['description'].setValue(task.description);
    this.taskForm.controls['columnId'].setValue(task.columnId);
    // this.selectedUsers$.next([...task.users]);
    // this.availableUsers$ = this.getAvailableUserObs(this.task.boardId);
    this.columns$ = this.store$.select(columnsByBoarIdSelector(this.task.boardId));

    if (this.uploadFileAfterSave) {
      this.uploadFileAfterSave = false;
      this.saveFile();
    }

    this.futurePoints = [];
    if (this.pointsSubs) {
      this.pointsSubs.unsubscribe();
    }
    this.pointsSubs = this.store$
      .select(pointsByTaskSelector(task._id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((points) => (this.points = points));

    if (this.filesSubs) {
      this.filesSubs.unsubscribe();
    }
    this.filesSubs = this.store$
      .select(filesByTaskSelector(task._id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((files) => this.files = files);

    if (this.canEditSubs) {
      this.canEditSubs.unsubscribe();
    }
    this.canEditSubs = this.store$
      .select(isMember(task._id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.canEdit = Boolean(val);
      });
  }


  onSubmit() {
    if (this.createMode) {
      this.taskService.createTaskFromModal(
        this.column,
        this.taskForm.value,
        this.taskForm.value.users.map((item: IUser) => item._id),
        this.futurePoints,
      );
    } else {
      this.taskService.updateTaskFromModal(
        this.task,
        this.taskForm.value,
        this.taskForm.value.users.map((item: IUser) => item._id),
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
      if (this.createMode) {
        this.futurePoints.push({
          title: val,
          done: false,
        });
      } else {
        const point: NewPointModel = {
          title: val,
          taskId: this.task._id,
          boardId: this.task.boardId,
          done: false,
        };
        this.store$.dispatch(createPointAction({ newPoint: point }));
      }

    }
    this.checkboxInput.nativeElement.value = '';
    this.checklistActions = false;
  }

  removePoint(index: number) {
    this.futurePoints.splice(index, 1);
  }

  uploadFile() {

    if (this.createMode) {
      this.confirmService.requestConfirm({
        question: 'taskModal.saveBeforeUpload',
      }).subscribe((val) => {
        if (val) {
          this.uploadFileAfterSave = true;
          this.saveAndEdit();
        }
      });
    } else {
      this.saveFile();
    }
  }

  saveFile() {
    if (!this.file) {
      return;
    }
    const formData = new FormData();
    formData.append('boardId', this.task.boardId);
    formData.append('taskId', this.task._id);
    formData.append('file', this.file);
    this.store$.dispatch(uplodFileAction({ formData }));
  }

  getFile(e: any) {
    this.file = e.target.files[0] || null;
  }

  saveAndEdit(): void {
    if (this.taskForm.invalid) {
      this.notify.notify('error', '${taskModal.invalidForm}');
      return;
    }

    this.store$
      .select(lastCreatedTask)
      .pipe(
        filter((val) => Boolean(val)),
        take(1),
      ).subscribe((task) => {
        this.title = 'taskModal.editMode.title';
        this.button = 'taskModal.editMode.button';
        this.createMode = false;
        this.useTask(task);
      });
    this.taskService.createTaskFromModal(
      this.column,
      this.taskForm.value,
      this.taskForm.value.users.map((item: IUser) => item._id),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
