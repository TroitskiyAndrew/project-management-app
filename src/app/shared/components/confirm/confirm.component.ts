import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmData } from '@core/models/common.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {


  public dialogData: ConfirmData = {
    question: 'defaultConfirm.question',
    approveButton: 'defaultConfirm.approve',
    cancelButton: 'defaultConfirm.cancel',
  };


  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmData) { }

  ngOnInit(): void {
    this.dialogData = {
      ...this.dialogData,
      ...this.data,
    };
  }



}
