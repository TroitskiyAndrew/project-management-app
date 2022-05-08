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
  isEditable: boolean = false;

  changedTitle: string = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('hello');
  }

  openTaskModal() {
    this.store.dispatch(openTaskModalAction());
  }

  changeTitle(value:string) {
    this.changedTitle = value;
    this.isEditable = !this.isEditable;
  }
}
