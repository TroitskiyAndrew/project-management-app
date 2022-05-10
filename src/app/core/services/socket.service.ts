import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyCallBack, SocketPayload } from '@core/models/common.model';
import { Store } from '@ngrx/store';
import { createBoardSocketAction, deleteBoardSocketAction, updateBoardSocketAction } from '@redux/actions/boards.actions';
import { createColumnSocketAction, updateColumnSocketAction, deleteColumnSocketAction } from '@redux/actions/columns.actions';
import { createFileSocketAction, deleteFileSocketAction } from '@redux/actions/files.actions';
import { createTaskSocketAction, updateTaskSocketAction, deleteTaskSocketAction } from '@redux/actions/tasks.actions';
import { createUserSocketAction, updateUserSocketAction, deleteUserSocketAction } from '@redux/actions/users.actions';
import { currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {

  private socket!: Socket;

  private currentBoardId!: string | null;

  private idSubs!: Subscription;

  constructor(private store$: Store<AppState>, private notifier: NotifierService, private router: Router) {

    this.idSubs = this.store$.select(currentBoardIdSelector).subscribe(id => {
      this.currentBoardId = id;
    });
  }

  private createNotifCalback(): NotifyCallBack {
    return (type: string, message: string): void => {
      this.notifier.notify(type, message);
    };
  }

  connect(): void {
    this.socket = io(environment.baseUrl);
    this.socket.on('boards', (payload: SocketPayload) => {
      switch (payload.action) {
        case 'added':
          this.store$.dispatch(createBoardSocketAction({ boards: payload.boards || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'edited':
          this.store$.dispatch(updateBoardSocketAction({ boards: payload.boards || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'deleted':
          if (payload.boards?.map(item => item._id).includes(this.currentBoardId || '')) {
            this.router.navigate(['']);
          }
          this.store$.dispatch(deleteBoardSocketAction({ boards: payload.boards || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
      }
    });
    this.socket.on('columns', (payload: SocketPayload) => {
      switch (payload.action) {
        case 'added':
          this.store$.dispatch(createColumnSocketAction({ columns: payload.columns || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'edited':
          this.store$.dispatch(updateColumnSocketAction({ columns: payload.columns || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'deleted':
          this.store$.dispatch(deleteColumnSocketAction({ columns: payload.columns || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
      }
    });

    this.socket.on('tasks', (payload: SocketPayload) => {
      switch (payload.action) {
        case 'added':
          this.store$.dispatch(createTaskSocketAction({ tasks: payload.tasks || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'edited':
          this.store$.dispatch(updateTaskSocketAction({ tasks: payload.tasks || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'deleted':
          this.store$.dispatch(deleteTaskSocketAction({ tasks: payload.tasks || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
      }
    });

    this.socket.on('users', (payload: SocketPayload) => {
      switch (payload.action) {
        case 'added':
          this.store$.dispatch(createUserSocketAction({ users: payload.users || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'edited':
          this.store$.dispatch(updateUserSocketAction({ users: payload.users || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'deleted':
          this.store$.dispatch(deleteUserSocketAction({ users: payload.users || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
      }
    });

    this.socket.on('files', (payload: SocketPayload) => {
      switch (payload.action) {
        case 'added':
          this.store$.dispatch(createFileSocketAction({ files: payload.files || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'deleted':
          this.store$.dispatch(deleteFileSocketAction({ files: payload.files || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
      }
    });
  }

  disconnet(): void {
    this.socket.disconnect();
  }

  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
  }
}
