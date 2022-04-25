import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

export interface RouterStateUrl {
  url: string,
  params: Params,
}

export interface State {
  router: RouterReducerState<RouterStateUrl>,
}

