import { Injectable } from '@angular/core';
import { ApiResponse } from '@core/models/common.model';
import { LocalizationService } from '@core/services/localization.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class NotifService {

  constructor(private notifier: NotifierService, private local: LocalizationService) { }

  handleError(error: ApiResponse) {
    this.notify('error', error.message);
  }

  handleSuccess(message: string) {
    this.notify('success', message);
  }

  notify(type: string, message: string) {
    this.notifier.notify(type, this.local.translateString(message));
  }

}
