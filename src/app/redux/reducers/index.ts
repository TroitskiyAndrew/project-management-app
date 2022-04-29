import { routerReducer } from '@ngrx/router-store';
import { apiResponseReducer } from '@redux/reducers/api-response.reducer';
import { currentUserReducer } from '@redux/reducers/current-user.reducer';

export const reducers = {
  router: routerReducer,
  currentUser: currentUserReducer,
  apiResponse: apiResponseReducer,
};
