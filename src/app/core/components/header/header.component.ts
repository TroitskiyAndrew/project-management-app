import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggleBoardModal = (): void => {
    console.log('toggleBoardModal');
  };

  toggleProfileModal = (): void => {
    console.log('toggleProfileModal');
  };

  logout = (): void => {
    console.log('logout');
  };
}
