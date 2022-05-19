import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateUrl } from 'src/app/redux/state.models';

export class RouterSerializer implements RouterStateSerializer<RouterStateUrl>{
  public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const url = routerState.url;
    let state: ActivatedRouteSnapshot = routerState.root;
    let endPoint = '';
    while (state.firstChild) {
      state = state.firstChild;
      if (state.routeConfig?.path) {
        endPoint = state.routeConfig?.path;
      }
    }
    const params = state.params;
    return {
      url: url,
      params: params,
      endPoint: endPoint,
    };
  }
}
