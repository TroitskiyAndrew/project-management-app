import { routerReducer } from '@ngrx/router-store';
import { currentUserReducer } from '@redux/reducers/current-user.reducer';

export const reducers = {
  router: routerReducer,
  currentUser: currentUserReducer,
};
