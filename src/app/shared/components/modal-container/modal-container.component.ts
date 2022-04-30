import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent implements OnInit {
  @Input() title: string = '';
  @Input() closeFunction: () => void = () => {};
  @HostListener('window:keyup.esc', ['$event'])
  closeByEsc(): void {
    this.closeFunction();
  }

  constructor() {}

  ngOnInit(): void {}
}
