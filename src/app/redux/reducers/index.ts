import { routerReducer } from '@ngrx/router-store';
import { apiResponseReducer } from '@redux/reducers/api-response.reducer';
import { currentUserReducer } from '@redux/reducers/current-user.reducer';
import { boardsReducer } from './boards.reducer';

export const reducers = {
  router: routerReducer,
  currentUser: currentUserReducer,
  boards: boardsReducer,
  apiResponse: apiResponseReducer,
};
