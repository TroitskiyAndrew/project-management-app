import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardModel } from '@shared/models/board.model';
import { Store } from '@ngrx/store';
import { clearCurrentBoardAction, setCurrentBoardAction } from '@redux/actions/boards.actions';
import { allBoardsSelector, currentBoardSelector, loadedSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { catchError, filter, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { selectId } from '@redux/selectors/router.selectors';
import { Router } from '@angular/router';
import { BoardsService } from '@core/services/boards.service';


@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
})
export class WorkspacePageComponent implements OnInit, OnDestroy {

  public bordsLoading$ = this.store$.select(loadedSelector);

  private destroy$ = new Subject<void>();

  panelOpenState = false;

  sidebarOpenState = false;

  currentBoard$: Observable<BoardModel | null> = this.store$.select(currentBoardSelector);

  boards$: Observable<BoardModel[]> = this.store$.select(allBoardsSelector);

  constructor(private store$: Store<AppState>, private router: Router, private boardsService: BoardsService) { }

  ngOnInit(): void {
    this.store$.select(selectId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      if (id) {
        this.bordsLoading$.pipe(
          filter(loaded => loaded),
          take(1),
          tap(() => this.store$.dispatch(setCurrentBoardAction({ id }))),
        ).subscribe();

        this.boardsService.findBoard(id).pipe(
          take(1),
          catchError(() => this.router.navigate(['404'])),
        ).subscribe();
      }
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store$.dispatch(clearCurrentBoardAction());
  }
}
