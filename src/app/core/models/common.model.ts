import { BoardModel, ColumnModel, FileModel, PointModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { Subject } from 'rxjs';

export type ApiResponse = {
  statusCode: number,
  message: string
};

export type PortalData = {
  [prop: string]: string | number | null,
};

export interface ConfirmData {
  question?: string;
  approveButton?: string,
  cancelButton?: string,
}

export interface ConfirmDialog extends ConfirmData {
  result: Subject<boolean>,
}

export type NotifyCallBack = ((type: string, message: string) => void) | null;

export type SocketPayload = {
  action: 'added' | 'edited' | 'deleted',
  notify: boolean,
  users?: IUser[],
  boards?: BoardModel[],
  columns?: ColumnModel[],
  tasks?: TaskModel[],
  files?: FileModel[],
  points?: PointModel[],
};
