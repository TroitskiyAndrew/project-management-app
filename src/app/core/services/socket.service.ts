import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyCallBack, SocketPayload } from '@core/models/common.model';
import { NotifService } from '@core/services/notif.service';
import { Store } from '@ngrx/store';
import { createBoardSocketAction, deleteBoardSocketAction, updateBoardSocketAction } from '@redux/actions/boards.actions';
import { createColumnSocketAction, updateColumnSocketAction, deleteColumnSocketAction } from '@redux/actions/columns.actions';
import { createFileSocketAction, deleteFileSocketAction } from '@redux/actions/files.actions';
import { createPointSocketAction, updatePointSocketAction, deletePointSocketAction } from '@redux/actions/points.actions';
import { createTaskSocketAction, updateTaskSocketAction, deleteTaskSocketAction } from '@redux/actions/tasks.actions';
import { createUserSocketAction, updateUserSocketAction, deleteUserSocketAction, logoutUserAction } from '@redux/actions/users.actions';
import { currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {

  private socket!: Socket;

  private currentBoardId!: string | null;

  private currentUserId!: string | null;

  private idSubs: Subscription[] = [];

  constructor(private store$: Store<AppState>, private notifier: NotifService, private router: Router) {

    this.idSubs.push(this.store$.select(currentBoardIdSelector).subscribe(id => {
      this.currentBoardId = id;
    }));
    this.idSubs.push(this.store$.select(selectCurrentUserId).subscribe(id => {
      this.currentUserId = id;
    }));
  }

  private createNotifCalback(): NotifyCallBack {
    return (type: string, message: string): void => {
      this.notifier.notify(type, message);
    };
  }

  connect(): void {
    this.socket = io(environment.baseUrl);
    this.socket.on('boards', (payload: SocketPayload) => {
      payload.boards = [...payload.boards?.filter(item => item.owner === this.currentUserId || item.users.includes(this.currentUserId || '')) || []];
      if (payload.boards.length === 0) {
        return;
      }
      switch (payload.action) {
        case 'added':
          this.store$.dispatch(createBoardSocketAction({ boards: payload.boards, _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'edited':
          this.store$.dispatch(updateBoardSocketAction({ boards: payload.boards, _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'deleted':
          if (payload.boards?.map(item => item._id).includes(this.currentBoardId || '')) {
            this.router.navigate(['']);
          }
          this.store$.dispatch(deleteBoardSocketAction({ boards: payload.boards, _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
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

    this.socket.on('points', (payload: SocketPayload) => {
      switch (payload.action) {
        case 'added':
          this.store$.dispatch(createPointSocketAction({ points: payload.points || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'edited':
          this.store$.dispatch(updatePointSocketAction({ points: payload.points || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'deleted':
          this.store$.dispatch(deletePointSocketAction({ points: payload.points || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
      }
    });

    this.socket.on('users', (payload: SocketPayload) => {
      switch (payload.action) {
        case 'added':
          this.store$.dispatch(createUserSocketAction({ users: payload.users || [], _notifCallBack: payload.notify ? this.createNotifCalback() : null }));
          break;
        case 'edited':
          if (payload.users?.map(item => item._id).includes(this.currentUserId || '')) {
            this.store$.dispatch(logoutUserAction());
          }
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
    this.idSubs.forEach(sub => sub.unsubscribe());
  }
}
