import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { restoreUserAction } from '@redux/actions/current-user.actions';
import { AppState } from '@redux/state.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.store$.dispatch(restoreUserAction());
  }
}
