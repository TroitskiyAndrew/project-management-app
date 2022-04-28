import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';
import { IStateUser } from '@shared/models/user.model';
import { ApiError } from '@core/models/common.model';

export interface RouterStateUrl {
  url: string,
  params: Params,
  endPoint: string,
}

export type CurrentUserState = {
  user: IStateUser | null,
};

export type ApiResponse = {
  response: ApiError | null,
};

export type AppState = {
  router: RouterReducerState<RouterStateUrl>,
  currentUser: CurrentUserState,
  apiResponse: ApiResponse,
};
