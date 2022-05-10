import { BoardModel, NewBoardModel } from '@shared/models/board.model';
import { createAction, props } from '@ngrx/store';
import { NotifyCallBack } from '@core/models/common.model';


export const createBoardAction = createAction('[boards] create', props<{ newBoard: NewBoardModel }>());
export const getBoardsAction = createAction('[boards] get');
export const setBoardsAction = createAction('[boards] set', props<{ boards: BoardModel[] }>());
export const deleteBoardAction = createAction('[boards] delete', props<{ id: string }>());
export const updateBoardAction = createAction('[boards] update', props<{ newParams: NewBoardModel, id: string }>());

export const findBoardAction = createAction('[boards] find', props<{ id: string }>());
export const setCurrentBoardAction = createAction('[boards] set current', props<{ board: BoardModel }>());
export const clearCurrentBoardAction = createAction('[boards] clear');

export const createBoardSocketAction = createAction('[socket][boards] create', props<{ board: BoardModel, _notifCallBack: NotifyCallBack }>());
export const updateBoardSocketAction = createAction('[socket][boards] update', props<{ board: BoardModel, _notifCallBack: NotifyCallBack }>());
export const deleteBoardSocketAction = createAction('[socket][boards] delete', props<{ board: BoardModel, _notifCallBack: NotifyCallBack }>());
