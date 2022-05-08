import { Injectable, OnDestroy } from '@angular/core';
import { ConfirmData, ConfirmDialog } from '@core/models/common.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService implements OnDestroy {

  public confirmDialog$ = new Subject<ConfirmDialog>();

  requestConfirm(data?: ConfirmData): Subject<boolean> {
    const result = new Subject<boolean>();
    let dialogData: ConfirmDialog = {
      result,
    };
    if (data) {
      dialogData = {
        ...dialogData,
        ...data,
      };
    }
    this.confirmDialog$.next(dialogData);
    return result;
  }

  ngOnDestroy(): void {
    this.confirmDialog$.complete();
  }

}
