import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-list-modal',
  templateUrl: './new-list-modal.component.html',
  styleUrls: ['./new-list-modal.component.scss'],
})
export class NewListModalComponent implements OnInit {
  public isOpened: boolean = false;

  public createListForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createListForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  close(): void {}

  onSubmit(): void {}
}
