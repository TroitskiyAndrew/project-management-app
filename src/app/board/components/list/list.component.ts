import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { deleteColumnAction, updateColumnAction } from '@redux/actions/columns.actions';
import { tasksByColumnSelector } from '@redux/selectors/boards.selectors';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { TaskModalComponent } from '@shared/components/task-modal/task-modal.component';
import { ColumnModel, NewColumnModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() column!: ColumnModel;

  private destroy$ = new Subject<void>();

  public tasks!: TaskModel[];

  public tasks$!: Observable<TaskModel[]>;

  public currentUser!: IUser | null | undefined;

  isEditable: boolean = false;

  constructor(
    private store$: Store<AppState>,
    private confirmService: ConfirmService,
    public portalService: PortalService,
  ) { }

  ngOnInit(): void {
    console.log(this.column);
    this.tasks$ = this.store$.select(tasksByColumnSelector(this.column._id));
    this.tasks$.subscribe((value) => {
      this.tasks = value;
    });
    this.store$.select(selectCurrentUser).subscribe((res) => (this.currentUser = res));
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
    console.log('Previous container: ', event.previousContainer.id);
    console.log('Previous index: ', event.previousIndex);
    console.log('Current container: ', event.container.id);
    console.log('Current index: ', event.currentIndex);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
