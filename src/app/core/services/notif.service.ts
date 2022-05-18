import { Injectable, OnDestroy } from '@angular/core';
import { ApiResponse } from '@core/models/common.model';
import { LocalizationService } from '@core/services/localization.service';
import { Store } from '@ngrx/store';
import { allColumnsSelector, allTasksSelector } from '@redux/selectors/boards.selectors';
import { selectAllUsers } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { ColumnModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { NotifierService } from 'angular-notifier';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifService implements OnDestroy {

  private destroy$ = new Subject<void>();

  private users!: IUser[];

  private columns!: ColumnModel[];

  private tasks!: TaskModel[];

  constructor(private notifier: NotifierService, private local: LocalizationService, private store$: Store<AppState>) {
    this.store$.select(selectAllUsers).pipe(takeUntil(this.destroy$)).subscribe(users => this.users = users);
    this.store$.select(allColumnsSelector).pipe(takeUntil(this.destroy$)).subscribe(columns => this.columns = columns);
    this.store$.select(allTasksSelector).pipe(takeUntil(this.destroy$)).subscribe(tasks => this.tasks = tasks);
  }

  handleError(error: ApiResponse) {
    this.notify('error', error.message);
  }

  handleSuccess(message: string) {
    this.notify('success', message);
  }

  notify(type: string, message: string) {
    this.notifier.notify(type, this.local.translateString(message));
  }

  notifyAboutSocket(dataType: string, type: string, ids: string[], initUser: string): void {
    let message = `${this.users.find(item => item._id === initUser)?.name} \${socketActions.${dataType}.${type}.${ids.length > 1 ? 'many' : 'one'}\}`;
    if (dataType === 'column') {
      message += `"${this.columns.filter(item => ids.includes(item._id)).map(item => item.title)}"`;
    } else if (dataType === 'task') {
      message += `"${this.tasks.filter(item => ids.includes(item._id)).map(item => item.title)}"`;
    }
    let notifType = 'success';
    if (type == 'update') {
      notifType = 'info';
    }
    if (type == 'delete') {
      notifType = 'warning';
    }
    this.notify(notifType, message);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
