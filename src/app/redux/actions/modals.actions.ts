import { createAction } from '@ngrx/store';

export const openBoardModalAction = createAction('[modals] open new board modal')
export const closeBoardModalAction = createAction('[modals] close new board modal')
export const openTaskModalAction = createAction('[modals] open new task modal')
export const closeTaskModalAction = createAction('[modals] close new task modal')