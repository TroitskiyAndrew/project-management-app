import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { NotifService } from '@core/services/notif.service';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { deleteColumnAction, updateColumnAction } from '@redux/actions/columns.actions';
import { updateSetOfTasksAction } from '@redux/actions/tasks.actions';
import { tasksByColumnSelector, tasksByCurrentBoardSelector } from '@redux/selectors/boards.selectors';
import { dropBlockSelector, editBoardModeSelector } from '@redux/selectors/enviroment.selectors';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { TaskModalComponent } from '@shared/components/task-modal/task-modal.component';
import { ColumnModel, NewColumnModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() column!: ColumnModel;

  private destroy$ = new Subject<void>();

  public tasks!: TaskModel[];

  private allTasks!: TaskModel[];

  public currentUser!: IUser | null;

  isEditable: boolean = false;

  private dropBlock: boolean = false;

  public editeMode = false;

  constructor(
    private store$: Store<AppState>,
    private confirmService: ConfirmService,
    public portalService: PortalService,
    private notifier: NotifService,
  ) { }

  ngOnInit(): void {
    this.store$.select(tasksByColumnSelector(this.column._id)).pipe(takeUntil(this.destroy$)).subscribe((tasks) => {
      this.tasks = tasks.sort((a, b) => a.order - b.order);
    });
    this.store$.select(tasksByCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe((tasks) => {
      this.allTasks = tasks.sort((a, b) => a.order - b.order);
    });
    this.store$.select(selectCurrentUser).pipe(takeUntil(this.destroy$)).subscribe((res) => (this.currentUser = res));

    this.store$.select(dropBlockSelector).pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.dropBlock = val;
    });
    this.store$.select(editBoardModeSelector).pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.editeMode = val;
    });
  }

  openTaskModal(): void {
    this.portalService.openComponent(TaskModalComponent, { column: this.column });
  }

  changeTitle(value: string) {
    if (value.trim()) {
      const newParams: NewColumnModel = {
        boardId: this.column.boardId,
        order: this.column.order,
        title: value,
      };
      this.store$.dispatch(
        updateColumnAction({ newParams, id: this.column._id }),
      );
    }
    this.isEditable = !this.isEditable;
  }

  deleteList() {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store$.dispatch(deleteColumnAction({ id: this.column._id }));
      }
    });
  }

  editTitle() {
    if (this.editeMode) {
      this.isEditable = !this.isEditable;
    }
  }

  drop(event: CdkDragDrop<TaskModel[], any, any>): void {
    const sameColumn = event.previousContainer.id === event.container.id;
    if (sameColumn && event.previousIndex == event.currentIndex) {
      return;
    }
    if (this.dropBlock) {
      this.notifier.notify('warning', 'wait a second, please');
      return;
    }
    const target = { ...this.allTasks.filter(task => task.columnId === event.previousContainer.id)[event.previousIndex], columnId: event.container.id };
    if (target.users.length > 0 && !target.users.includes(this.currentUser?._id || '')) {
      this.notifier.notify('warning', '${list.dropError}');
      return;
    }

    const affectedIndex = sameColumn && event.currentIndex > event.previousIndex ? event.currentIndex : event.currentIndex - 1;
    const affectedTasks = this.tasks.filter((task, index) => index > affectedIndex && task._id != target._id);
    let result: TaskModel[] = [];
    if (affectedTasks.length > 0) {
      result = [...affectedTasks.map(task => ({ ...task, order: task.order + 1 }))];
      target.order = Math.min(...affectedTasks.map(task => task.order));
    } else {
      target.order = Math.max(...this.tasks.map(task => task.order)) + 1;
    }
    result.push(target);
    const result2 = [...this.tasks.map(it => ({ ...it })).filter(item => !result.map(it => it._id).includes(item._id)), ...result].sort((a, b) => a.order - b.order);
    result2.forEach((item, index) => item.order = index + 1);
    this.store$.dispatch(updateSetOfTasksAction({ tasks: result2 }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
