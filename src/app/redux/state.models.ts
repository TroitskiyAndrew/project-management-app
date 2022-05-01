import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';
import { BoardModel } from '../tasks/models/boardModel';
import { IUser } from '@shared/models/user.model';
import { ApiResponse } from '@core/models/common.model';

export interface RouterStateUrl {
  url: string,
  params: Params,
  endPoint: string,
}

export type CurrentUserState = {
  user: IUser | null,
};

export type ApiResponseState = {
  response: ApiResponse | null,
};

export interface ModalsState {
  createBoard: boolean,
  createTask: boolean,
}

export interface BoardsState {
  boards: BoardModel[]
}

export type AppState = {
  router: RouterReducerState<RouterStateUrl>,
  currentUser: CurrentUserState,
  modals: ModalsState,
  boards: BoardsState,
  apiResponse: ApiResponseState,
};
