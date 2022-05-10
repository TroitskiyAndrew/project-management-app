import { routerReducer } from '@ngrx/router-store';
import { apiResponseReducer } from '@redux/reducers/api-response.reducer';
import { UsersReducer } from '@redux/reducers/usres.reducer';
import { boardsReducer } from './boards.reducer';

export const reducers = {
  router: routerReducer,
  users: UsersReducer,
  boards: boardsReducer,
  apiResponse: apiResponseReducer,
};
