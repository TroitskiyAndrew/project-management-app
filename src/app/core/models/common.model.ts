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
