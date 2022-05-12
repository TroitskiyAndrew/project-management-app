import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardModel } from '@shared/models/board.model';
import { Store } from '@ngrx/store';
import { clearCurrentBoardAction, setCurrentBoardAction } from '@redux/actions/boards.actions';
import { allBoardsSelector, currentBoardSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { selectId } from '@redux/selectors/router.selectors';
import { Router } from '@angular/router';


@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
})
export class WorkspacePageComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  panelOpenState = false;

  sidebarOpenState = false;

  currentBoard$: Observable<BoardModel | null | undefined> = this.store$.select(currentBoardSelector);

  boards$: Observable<BoardModel[] | null> = this.store$.select(allBoardsSelector);

  constructor(private store$: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store$.select(selectId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      if (id) {
        this.store$.dispatch(setCurrentBoardAction({ id }));
      }
    });
    this.store$.select(currentBoardSelector).pipe(
      takeUntil(this.destroy$),
      filter(val => val === null),
    ).subscribe(() => this.router.navigate(['404']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store$.dispatch(clearCurrentBoardAction());
  }
}
