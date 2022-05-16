import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

import { IUser } from '@shared/models/user.model';
import { ApiResponse, LangModel } from '@core/models/common.model';
import { BoardModel, ColumnModel, FileModel, PointModel, TaskModel } from '@shared/models/board.model';

export interface RouterStateUrl {
  url: string,
  params: Params,
  endPoint: string,
}

export type UsersState = {
  currentUser: IUser | null | undefined,
  users: IUser[],
};

export type EnviromentState = {
  lang: LangModel,
};

export type ApiResponseState = {
  response: ApiResponse | null,
};


export interface BoardsState {
  currentBoard: BoardModel | null,
  boards: BoardModel[],
  columns: ColumnModel[],
  tasks: TaskModel[],
  files: FileModel[],
  points: PointModel[],
  loaded: boolean,
  lastCreatedTask: TaskModel | null,
}

export type AppState = {
  router: RouterReducerState<RouterStateUrl>,
  users: UsersState,
  boards: BoardsState,
  apiResponse: ApiResponseState,
  enviroment: EnviromentState,
};
