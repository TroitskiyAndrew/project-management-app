import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { openBoardModalAction } from '@redux/actions/modals.actions';
import { deleteUserAction, logoutUserAction } from '@redux/actions/users.actions';
import { selectCurrentUser, userLoaded } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { IUser } from '@shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PortalService } from '@core/services/portal.service';
import { NewBoardModalComponent } from '@shared/components/new-board-modal/new-board-modal.component';
import { ConfirmService } from '@core/services/confirm.service';
import { LangModel } from '@core/models/common.model';
import { changeLangAction } from '@redux/actions/enviroment.actions';
import { filter, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [],
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public isLogged = false;

  public isLoaded = false;

  public userData: IUser | null = null;

  public langTogglerValue: boolean = false;

  constructor(
    private router: Router,
    private store$: Store<AppState>,
    private cookieService: CookieService,
    private portalService: PortalService,
    private confirmService: ConfirmService,
  ) { }

  ngOnInit(): void {
    this.store$.select(selectCurrentUser)
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe((value) => {
        this.isLogged = Boolean(value);
        this.userData = value;
      });
    this.store$.select(userLoaded)
      .pipe(
        filter(val => val),
        take(1),
      ).subscribe((value) => {
        this.isLoaded = value;
      });
    const lang = this.cookieService.get('project-manager-lang') as LangModel;
    this.store$.dispatch(changeLangAction({ lang }));
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

  logout(): void {
    this.store$.dispatch(logoutUserAction());
  }

  deleteUser(): void {
    this.confirmService.requestConfirm({
      question: 'header.removeUserConfirm.question',
      approveButton: 'header.removeUserConfirm.approve',
      cancelButton: 'header.removeUserConfirm.cancel',
    }).subscribe(val => {
      if (val) {
        this.store$.dispatch(deleteUserAction());
      }
    });
  }

  changeLang(event: MatSlideToggleChange): void {
    const lang: LangModel = event.checked ? 'ru' : 'en';
    this.store$.dispatch(changeLangAction({ lang }));
  }

  setLangEn(): void {
    this.langTogglerValue = false;
  }

  setLangRu(): void {
    this.langTogglerValue = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
