import { routerReducer } from '@ngrx/router-store';
import { apiResponseReducer } from '@redux/reducers/api-response.reducer';
import { currentUserReducer } from '@redux/reducers/current-user.reducer';
import { modalsReducer } from './modals.reducer';
import { boardsReducer } from './tasks.reducer';

export const reducers = {
  router: routerReducer,
  currentUser: currentUserReducer,
  modals: modalsReducer,
  boards: boardsReducer,
  apiResponse: apiResponseReducer,
};
