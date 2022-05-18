import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifService } from '@core/services/notif.service';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { allBoardsSelector, loadedSelector } from '@redux/selectors/boards.selectors';
import { selectCurrentUser, userLoaded } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { SearchModalComponent } from '@shared/components/search-modal/search-modal.component';
import { BoardModel, TaskModel } from '@shared/models/board.model';
import { IUser } from '@shared/models/user.model';
import { filter, Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public bordsLoading$ = this.store$.select(loadedSelector);

  public currentUser$ = this.store$.select(selectCurrentUser);

  public currentUser!: IUser | null;

  public userBoards$: Observable<BoardModel[]> =
    this.store$.select(allBoardsSelector);

  public isLogged = false;

  public isLoaded = false;

  public panelOpenState = false;

  public sidebarOpenState = false;

  public searchRequest: string = '';

  constructor(private store$: Store<AppState>, private router: Router, private portalService: PortalService, private notifier: NotifService) { }

  ngOnInit(): void {
    this.store$.select(selectCurrentUser)
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe((value) => {
        this.isLogged = Boolean(value);
        this.currentUser = value;
      });
    this.store$.select(userLoaded)
      .pipe(
        filter(val => val),
        take(1),
      ).subscribe((value) => {
        this.isLoaded = value;
      });
  }

  showBoard(board: BoardModel): void {
    this.router.navigate([`/board/${board._id}`]);
  }

  search(): void {
    if (!this.searchRequest) {
      this.notifier.notify('warning', 'empty request');
      return;
    }
    this.portalService.openComponent(SearchModalComponent, {
      request: this.searchRequest,
      taskSubject: new Subject<TaskModel>(),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
