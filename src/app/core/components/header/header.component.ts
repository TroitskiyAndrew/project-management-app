import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { openBoardModalAction } from '@redux/actions/modals.actions';
import { logoutUserAction } from '@redux/actions/current-user.actions';
import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [],
})
export class HeaderComponent implements OnInit {
  public currentUser$ = this.store.select(selectCurrentUser);

  public isLogged: boolean = false;

  public userData: IUser | null = null;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private translate: TranslateService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.currentUser$.subscribe((value) => {
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

  openBoardModal = (): void => {
    this.store.dispatch(openBoardModalAction());
  };

  logout = (): void => {
    this.store.dispatch(logoutUserAction());
  };

  changeAppLang = (event: MouseEvent): void => {
    const lang: string = (event.target as HTMLElement).id;
    this.cookieService.set('project-manager-lang', lang);
    this.translate.use(lang);
  };
}
