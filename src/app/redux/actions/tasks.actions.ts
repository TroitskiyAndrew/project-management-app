import { createAction, props } from '@ngrx/store';
import { BoardModel } from 'src/app/tasks/models/boardModel';

export const createBoardAction = createAction(
  '[tasks] create',
  props<{ title: string }>(),
);
export const succesCreateBoardAction = createAction('[tasks] success create');
export const errorCreateBoardAction = createAction('[tasks] error create');

export const getBoardsAction = createAction('[tasks] get boards');
export const successGetBoardsAction = createAction(
  '[tasks] success get boards',
  props<{ boards: BoardModel[] }>(),
);
export const errorGetBoardsAction = createAction('[tasks] error get boards');

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
