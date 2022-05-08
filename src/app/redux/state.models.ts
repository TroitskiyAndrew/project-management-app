import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

import { IUser } from '@shared/models/user.model';
import { ApiResponse } from '@core/models/common.model';
import { BoardModel } from '@shared/models/board.model';

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


export interface BoardsState {
  boards: BoardModel[]
}

export type AppState = {
  router: RouterReducerState<RouterStateUrl>,
  currentUser: CurrentUserState,
  boards: BoardsState,
  apiResponse: ApiResponseState,
};
