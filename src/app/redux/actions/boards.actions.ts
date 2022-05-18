import { BoardModel, NewBoardModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';
import { NotifyCallBack } from '@core/models/common.model';


export const createBoardAction = createAction('[boards] create', props<{ newBoard: NewBoardModel }>());
export const getAllBoardsAction = createAction('[boards] get all');
export const setBoardsAction = createAction('[boards] set', props<{ boards: BoardModel[] }>());
export const deleteBoardAction = createAction('[boards] delete', props<{ id: string }>());
export const updateBoardAction = createAction('[boards] update', props<{ newParams: NewBoardModel, id: string }>());

export const addBoardsToStoreAction = createAction('[boards][store] add', props<{ boards: BoardModel[] }>());
export const updateBoardsInStoreAction = createAction('[boards][store] update', props<{ boards: BoardModel[] }>());
export const deleteBoardsFromStoreAction = createAction('[boards][store] delete', props<{ boards: BoardModel[] }>());

export const setCurrentBoardAction = createAction('[boards] find', props<{ id: string }>());
export const clearCurrentBoardAction = createAction('[boards] clear');


export const createBoardSocketAction = createAction('[socket][boards] create', props<{ boards: BoardModel[], _notifCallBack: NotifyCallBack }>());
export const updateBoardSocketAction = createAction('[socket][boards] update', props<{ boards: BoardModel[], _notifCallBack: NotifyCallBack }>());
export const deleteBoardSocketAction = createAction('[socket][boards] delete', props<{ boards: BoardModel[], _notifCallBack: NotifyCallBack }>());


