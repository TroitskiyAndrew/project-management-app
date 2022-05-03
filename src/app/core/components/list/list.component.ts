import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { openTaskModalAction } from '@redux/actions/modals.actions';
import { AppState } from '@redux/state.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('hello');
  }

  openTaskModal() {
    this.store.dispatch(openTaskModalAction());
  }
}
