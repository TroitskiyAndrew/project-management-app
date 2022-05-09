import { Injectable } from '@angular/core';
import { NotifyCallBack } from '@core/models/common.model';
import { Store } from '@ngrx/store';
import { createBoardSocketAction, deleteBoardSocketAction, updateBoardSocketAction } from '@redux/actions/boards.actions';
import { createColumnSocketAction, updateColumnSocketAction, deleteColumnSocketAction } from '@redux/actions/columns.actions';
import { createFileSocketAction, deleteFileSocketAction } from '@redux/actions/files.actions';
import { createTaskSocketAction, updateTaskSocketAction, deleteTaskSocketAction } from '@redux/actions/tasks.actions';
import { createUserSocketAction, updateUserSocketAction, deleteUserSocketAction } from '@redux/actions/users.actions';
import { AppState } from '@redux/state.models';
import { BoardModel, ColumnModel, FileModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { NotifierService } from 'angular-notifier';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket!: Socket;

  constructor(private store$: Store<AppState>, private notifier: NotifierService) { }

  private createNotifCalback(): NotifyCallBack {
    return (type: string, message: string): void => {
      this.notifier.notify(type, message);
    };
  }

  connect(): void {
    this.socket = io(environment.baseUrl);
    this.socket.on('boards', (type: string, board: BoardModel) => {
      switch (type) {
        case 'add':
          this.store$.dispatch(createBoardSocketAction({ board, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'update':
          this.store$.dispatch(updateBoardSocketAction({ board, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'remove':
          this.store$.dispatch(deleteBoardSocketAction({ board, _notifCallBack: this.createNotifCalback() }));
          break;
      }
    });
    this.socket.on('columns', (type: string, column: ColumnModel) => {
      switch (type) {
        case 'add':
          this.store$.dispatch(createColumnSocketAction({ column, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'update':
          this.store$.dispatch(updateColumnSocketAction({ column, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'remove':
          this.store$.dispatch(deleteColumnSocketAction({ column, _notifCallBack: this.createNotifCalback() }));
          break;
      }
    });

    this.socket.on('tasks', (type: string, task: TaskModel) => {
      switch (type) {
        case 'add':
          this.store$.dispatch(createTaskSocketAction({ task, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'update':
          this.store$.dispatch(updateTaskSocketAction({ task, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'remove':
          this.store$.dispatch(deleteTaskSocketAction({ task, _notifCallBack: this.createNotifCalback() }));
          break;
      }
    });

    this.socket.on('users', (type: string, user: IUser) => {
      switch (type) {
        case 'add':
          this.store$.dispatch(createUserSocketAction({ user, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'update':
          this.store$.dispatch(updateUserSocketAction({ user, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'remove':
          this.store$.dispatch(deleteUserSocketAction({ user, _notifCallBack: this.createNotifCalback() }));
          break;
      }
    });

    this.socket.on('files', (type: string, file: FileModel) => {
      switch (type) {
        case 'add':
          this.store$.dispatch(createFileSocketAction({ file, _notifCallBack: this.createNotifCalback() }));
          break;
        case 'remove':
          this.store$.dispatch(deleteFileSocketAction({ file, _notifCallBack: this.createNotifCalback() }));
          break;
      }
    });
  }

  disconnet(): void {
    this.socket.disconnect();
  }
}
