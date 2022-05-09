import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public currentUser$ = this.store.select(selectCurrentUser);

  public isLogged: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.currentUser$.subscribe((value) => {
      this.isLogged = !!value;
    });
  }
}
