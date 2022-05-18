import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketPayload } from '@core/models/common.model';
import { NotifService } from '@core/services/notif.service';
import { Store } from '@ngrx/store';
import { addBoardsSocketAction, deleteBoardsSocketAction, updateBoardsSocketAction } from '@redux/actions/boards.actions';
import { addColumnsSocketAction, updateColumnsSocketAction, deleteColumnsSocketAction } from '@redux/actions/columns.actions';
import { addFilesSocketAction, deleteFilesSocketAction } from '@redux/actions/files.actions';
import { addPointsSocketAction, updatePointsSocketAction, deletePointsSocketAction } from '@redux/actions/points.actions';
import { addTasksSocketAction, updateTasksSocketAction, deleteTasksSocketAction } from '@redux/actions/tasks.actions';
import { addUsersSocketAction, updateUsersSocketAction, deleteUsersSocketAction } from '@redux/actions/users.actions';
import { currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { selectGuids } from '@redux/selectors/enviroment.selectors';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { Subject, takeUntil } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {

  private destroy$ = new Subject<void>();

  private socket!: Socket;

  private currentUserId!: string;

  private currentBoardId!: string;

  private myGuids: string[] = [];

  constructor(private store$: Store<AppState>, private notifier: NotifService, private router: Router) {

    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentUserId = id || '';
    });
    this.store$.select(currentBoardIdSelector).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentBoardId = id || '';
    });
    this.store$.select(selectGuids).pipe(takeUntil(this.destroy$)).subscribe(guids => {
      this.myGuids = guids;
    });
  }


  connect(): void {
    this.socket = io(environment.baseUrl);
    this.socket.on('boards', (payload: SocketPayload) => {
      const { action, users, notify, ids, guid, initUser } = payload;
      if (ids?.includes(this.currentBoardId) && action === 'delete') {
        this.router.navigate(['']);
      }
      if (!users.includes) {
        debugger;
      }
      if (this.myGuids.includes(guid || '') || !users.includes(this.currentUserId)) {
        return;
      }
      switch (action) {
        case 'add':
          this.store$.dispatch(addBoardsSocketAction({ ids: ids || [], notify: notify || false, initUser: initUser || '' }));
          break;
        case 'update':
          this.store$.dispatch(updateBoardsSocketAction({ ids: ids || [] }));
          break;
        case 'delete':
          this.store$.dispatch(deleteBoardsSocketAction({ ids: ids || [] }));
          break;
      }
    });
    this.socket.on('columns', (payload: SocketPayload) => {
      const { action, users, notify, ids, guid, initUser } = payload;
      if (this.myGuids.includes(guid || '') || !users.includes(this.currentUserId)) {
        return;
      }
      switch (action) {
        case 'add':
          this.store$.dispatch(addColumnsSocketAction({ ids: ids || [], notify: notify || false, initUser: initUser || '' }));
          break;
        case 'update':
          if (notify) {
            this.notifier.notifyAboutSocket('column', 'update', ids || [], initUser || '');
          }
          this.store$.dispatch(updateColumnsSocketAction({ ids: ids || [] }));
          break;
        case 'delete':
          if (notify) {
            this.notifier.notifyAboutSocket('column', 'delete', ids || [], initUser || '');
          }
          this.store$.dispatch(deleteColumnsSocketAction({ ids: ids || [] }));
          break;
      }
    });
    this.socket.on('tasks', (payload: SocketPayload) => {
      const { action, users, notify, ids, guid, initUser } = payload;
      if (this.myGuids.includes(guid || '') || !users.includes(this.currentUserId)) {
        return;
      }
      switch (action) {
        case 'add':
          this.store$.dispatch(addTasksSocketAction({ ids: ids || [], notify: notify || false, initUser: initUser || '' }));
          break;
        case 'update':
          if (notify) {
            this.notifier.notifyAboutSocket('task', 'update', ids || [], initUser || '');
          }
          this.store$.dispatch(updateTasksSocketAction({ ids: ids || [] }));
          break;
        case 'delete':
          if (notify) {
            this.notifier.notifyAboutSocket('task', 'delete', ids || [], initUser || '');
          }
          this.store$.dispatch(deleteTasksSocketAction({ ids: ids || [] }));
          break;
      }
    });
    this.socket.on('points', (payload: SocketPayload) => {
      const { action, users, notify, ids, guid, initUser } = payload;
      if (this.myGuids.includes(guid || '') || !users.includes(this.currentUserId)) {
        return;
      }
      switch (action) {
        case 'add':
          this.store$.dispatch(addPointsSocketAction({ ids: ids || [], notify: notify || false, initUser: initUser || '' }));
          break;
        case 'update':
          this.store$.dispatch(updatePointsSocketAction({ ids: ids || [] }));
          break;
        case 'delete':
          this.store$.dispatch(deletePointsSocketAction({ ids: ids || [] }));
          break;
      }
    });
    this.socket.on('files', (payload: SocketPayload) => {
      const { action, users, notify, ids, guid, initUser } = payload;
      if (this.myGuids.includes(guid || '') || !users.includes(this.currentUserId)) {
        return;
      }
      switch (action) {
        case 'add':
          this.store$.dispatch(addFilesSocketAction({ ids: ids || [], notify: notify || false, initUser: initUser || '' }));
          break;
        case 'delete':
          this.store$.dispatch(deleteFilesSocketAction({ ids: ids || [] }));
          break;
      }
    });
    this.socket.on('users', (payload: SocketPayload) => {
      const { action, users, guid } = payload;
      if (this.myGuids.includes(guid || '') || !users.includes(this.currentUserId)) {
        return;
      }
      switch (action) {
        case 'add':
          this.store$.dispatch(addUsersSocketAction({ ids: users || [] }));
          break;
        case 'update':
          this.store$.dispatch(updateUsersSocketAction({ ids: users || [] }));
          break;
        case 'delete':
          this.store$.dispatch(deleteUsersSocketAction({ ids: users || [] }));
          break;
      }
    });

  }

  disconnet(): void {
    this.socket.disconnect();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
