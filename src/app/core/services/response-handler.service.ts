import { Injectable } from '@angular/core';
import { ApiResponse } from '@core/models/common.model';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class ResponseHandlerService {

  constructor(private notifier: NotifierService) { }

  handleError(error: ApiResponse) {
    this.notifier.notify('error', error.message);
  }

  handleSuccess(message: string) {
    this.notifier.notify('success', message);
  }
}
