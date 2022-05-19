import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmData } from '@core/models/common.model';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {



  constructor(private dialog: MatDialog) { }

  requestConfirm(data?: ConfirmData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      hasBackdrop: true,
      autoFocus: false,
      data: data || {},
    });
    return dialogRef.afterClosed();
  }



}
