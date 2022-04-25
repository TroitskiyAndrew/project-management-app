import { createFeatureSelector } from '@ngrx/store';
import { IUser } from '@shared/models/user.model';

export const selectCurrentUser = createFeatureSelector<IUser | null>('currentUser');
