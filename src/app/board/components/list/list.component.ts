import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { deleteColumnAction, updateColumnAction } from '@redux/actions/columns.actions';
import { updateSetOfTasksAction } from '@redux/actions/tasks.actions';
import { tasksByColumnSelector, tasksByCurrentBoardSelector } from '@redux/selectors/boards.selectors';
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

  public currentUser!: IUser | null | undefined;

  isEditable: boolean = false;

  constructor(
    private store$: Store<AppState>,
    private confirmService: ConfirmService,
    public portalService: PortalService,
  ) { }

  ngOnInit(): void {
    this.store$.select(tasksByColumnSelector(this.column._id)).pipe(takeUntil(this.destroy$)).subscribe((tasks) => {
      this.tasks = tasks.sort((a, b) => a.order - b.order);
    });
    this.store$.select(tasksByCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe((tasks) => {
      this.allTasks = tasks.sort((a, b) => a.order - b.order);
    });
    this.store$.select(selectCurrentUser).pipe(takeUntil(this.destroy$)).subscribe((res) => (this.currentUser = res));
  }

  openTaskModal(): void {
    this.portalService.openComponent(TaskModalComponent, { column: this.column });
  }

  changeTitle(value: string) {
    const newParams: NewColumnModel = {
      boardId: this.column.boardId,
      order: this.column.order,
      title: value,
    };
    this.store$.dispatch(
      updateColumnAction({ newParams, id: this.column._id }),
    );
    this.isEditable = !this.isEditable;
  }

  deleteList() {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store$.dispatch(deleteColumnAction({ id: this.column._id }));
      }
    });
  }

  drop(event: CdkDragDrop<TaskModel[], any, any>): void {
    const sameColumn = event.previousContainer.id === event.container.id;
    if (sameColumn && event.previousIndex == event.currentIndex) {
      return;
    }
    const target = { ...this.allTasks.filter(task => task.columnId === event.previousContainer.id)[event.previousIndex], columnId: event.container.id };
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
    this.store$.dispatch(updateSetOfTasksAction({ tasks: result }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
