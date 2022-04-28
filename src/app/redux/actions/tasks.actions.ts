import { createAction, props } from '@ngrx/store';

export const createBoardAction = createAction('[tasks] create');
export const succesCreateBoardAction = createAction('[tasks] success create')
export const errorCreateBoardAction = createAction('[tasks] error create')

export const getAllBoardsAction = createAction('[tasks] get all boards');
export const getBoardByIdAction = createAction(
  '[tasks] get board by id',
  props<{ id: string }>(),
);
export const updateBoardAction = createAction(
  '[tasks] update board',
  props<{ id: string }>(),
);
export const deleteBoardAction = createAction(
  '[tasks] delete board',
  props<{ id: string }>(),
);
