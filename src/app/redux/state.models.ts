import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';
import { IStateUser } from '@shared/models/user.model';

export interface RouterStateUrl {
  url: string,
  params: Params,
  endPoint: string,
}

export type CurrentUserState = {
  user: IStateUser | null,
};

export interface ModalsState {
  createBoard: boolean,
  createTask: boolean,
}

export interface TasksState {
  
}

export type AppState = {
  router: RouterReducerState<RouterStateUrl>,
  currentUser: CurrentUserState,
  modals: ModalsState,
  tasks: TasksState,
};
