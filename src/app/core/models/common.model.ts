import { ColumnModel, TaskModel } from '@shared/models/board.model';
import { Subject } from 'rxjs';

export type ApiResponse = {
  statusCode: number,
  message: string
};

export type PortalData = {
  [prop: string]: boolean | string | number | null | TaskModel | ColumnModel | Subject<TaskModel>
};

export interface ConfirmData {
  question?: string;
  approveButton?: string,
  cancelButton?: string,
}

export interface ConfirmDialog extends ConfirmData {
  result: Subject<boolean>,
}

export type SocketPayload = {
  action: 'add' | 'update' | 'delete',
  users: string[],
  notify?: boolean,
  ids?: string[],
  guid?: string,
  initUser?: string,
};

export type LangModel = 'en' | 'ru';
