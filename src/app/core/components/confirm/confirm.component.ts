import { Component, OnInit } from '@angular/core';
import { ConfirmDialog } from '@core/models/common.model';
import { ConfirmService } from '@core/services/confirm.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

  public open = false;

  public question = '';

  public approveButton = '';

  public cancelButton = '';

  private result!: Subject<boolean>;

  constructor(private congirmService: ConfirmService) { }

  ngOnInit(): void {
    this.setDefault();
    this.congirmService.confirmDialog$.subscribe((dialogData: ConfirmDialog) => {
      this.result = dialogData.result;
      if (dialogData.question) {
        this.question = dialogData.question;
      }
      if (dialogData.approveButton) {
        this.approveButton = dialogData.approveButton;
      }
      if (dialogData.cancelButton) {
        this.cancelButton = dialogData.cancelButton;
      }
      this.open = true;
    });
  }

  approve(): void {
    this.close(true);
  }

  canel(): void {
    this.close(false);
  }

  close(result: boolean): void {
    this.result.next(result);
    this.result.complete();
    this.setDefault();
    this.open = false;
  }

  setDefault(): void {
    this.question = 'defaultConfirm.question';
    this.approveButton = 'defaultConfirm.approve';
    this.cancelButton = 'defaultConfirm.cancel';
  }

}
