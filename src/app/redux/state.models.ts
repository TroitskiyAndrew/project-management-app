import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';
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

export type AppState = {
  router: RouterReducerState<RouterStateUrl>,
  currentUser: CurrentUserState,
  apiResponse: ApiResponseState,
};
