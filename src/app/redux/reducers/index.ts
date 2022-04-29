import { routerReducer } from '@ngrx/router-store';
import { apiResponseReducer } from '@redux/reducers/api-response.reducer';
import { currentUserReducer } from '@redux/reducers/current-user.reducer';
import { modalsReducer } from './modals.reducer';
import { tasksReducer } from './tasks.reducer';

export const reducers = {
  router: routerReducer,
  currentUser: currentUserReducer,
  modals: modalsReducer,
  tasks: tasksReducer,
  apiResponse: apiResponseReducer,
};
