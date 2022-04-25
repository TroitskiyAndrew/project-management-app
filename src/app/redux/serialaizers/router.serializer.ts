import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateUrl } from 'src/app/redux/state.models';

export class RouterSerializer implements RouterStateSerializer<RouterStateUrl>{
  public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const url = routerState.url;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const params = state.params;
    return {
      url: url,
      params: params,
    };
  }
}
