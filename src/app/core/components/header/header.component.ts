import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { openBoardModalAction } from '@redux/actions/modals.actions';
import { logoutUserAction } from '@redux/actions/users.actions';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PortalService } from '@core/services/portal.service';
import { NewBoardModalComponent } from '@shared/components/new-board-modal/new-board-modal.component';

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

  public langTogglerValue: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private translate: TranslateService,
    private cookieService: CookieService,
    private portalService: PortalService,
  ) { }

  ngOnInit(): void {
    this.currentUser$.subscribe((value) => {
      this.isLogged = !!value;
      this.userData = value;
    });
    const lang = this.cookieService.get('project-manager-lang');
    this.langTogglerValue = lang === 'ru';
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
    this.portalService.openComponent(NewBoardModalComponent);
  };

  logout = (): void => {
    this.store.dispatch(logoutUserAction());
  };

  changeLang(event: MatSlideToggleChange): void {
    const lang: string = event.checked ? 'ru' : 'en';
    this.cookieService.set('project-manager-lang', lang);
    this.translate.use(lang);
  }

  setLangEn(): void {
    this.langTogglerValue = false;
  }

  setLangRu(): void {
    this.langTogglerValue = true;
  }
}
