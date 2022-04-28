import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUserAction } from '@redux/actions/current-user.actions';
import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState } from '@redux/state.models';
import { IStateUser } from '@shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [],
})
export class HeaderComponent implements OnInit {
  public currentUser$ = this.store.select(selectCurrentUser);

  public isLogged: boolean = false;

  public userData: IStateUser | null = null;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.currentUser$.subscribe((value) => {
      console.log(value);
      this.isLogged = !!value;
      this.userData = value;
    });
  }

  openLoginPage(): void {
    this.router.navigate(['user', 'login']);
  }

  openRegistrationPage(): void {
    this.router.navigate(['user', 'registration']);
  }

  openUserEditPage(): void {
    this.router.navigate(['user', 'edit']);
  }

  toggleBoardModal = (): void => {
    console.log('toggleBoardModal');
  };

  logout = (): void => {
    this.store.dispatch(logoutUserAction());
  };

  changeAppLang = (event: MouseEvent): void => {
    const lang: string = (event.target as HTMLElement).id;
    console.log(`switch lang to ${lang}`);
  };
}
