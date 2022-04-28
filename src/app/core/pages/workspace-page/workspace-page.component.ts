import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
})
export class WorkspacePageComponent implements OnInit {
  panelOpenState = false;

  sidebarOpenState = false;
  // constructor() {}

  ngOnInit(): void {
    console.log('hello');
  }
}
