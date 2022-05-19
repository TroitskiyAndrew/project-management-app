import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardModel } from '@shared/models/board.model';
import { Store } from '@ngrx/store';
import { clearCurrentBoardAction, deleteBoardAction, setCurrentBoardAction, updateBoardAction } from '@redux/actions/boards.actions';
import { allBoardsSelector, currentBoardSelector, invitedUsersInCurrentBoardSelector, loadedSelector, usersInCurrentBoardSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { catchError, filter, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { selectId } from '@redux/selectors/router.selectors';
import { Router } from '@angular/router';
import { BoardsService } from '@core/services/boards.service';
import { editBoardModeSelector } from '@redux/selectors/enviroment.selectors';
import { startEditBoardAction, stopEditBoardAction } from '@redux/actions/enviroment.actions';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { IUser } from '@shared/models/user.model';
import { selectAllUsersExceptCurrent, selectCurrentUserId } from '@redux/selectors/users.selectors';
import { ConfirmService } from '@core/services/confirm.service';


@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
})
export class WorkspacePageComponent implements OnInit, OnDestroy {

  public bordsLoading$ = this.store$.select(loadedSelector);

  private destroy$ = new Subject<void>();

  public panelOpenState = false;

  public sidebarOpenState = false;

  public currentBoard!: BoardModel;

  public boards$: Observable<BoardModel[]> = this.store$.select(allBoardsSelector);

  public editeMode = false;

  public allAvailableUsers!: IUser[];

  public selectedUsers!: IUser[];

  public boardUsers!: IUser[];

  public newTitle!: string;

  public currentUserId!: string;

  public dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  constructor(private store$: Store<AppState>, private router: Router, private boardsService: BoardsService, private confirmService: ConfirmService) { }

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

    this.store$.select(editBoardModeSelector).pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.editeMode = val;
    });

    this.store$.select(selectAllUsersExceptCurrent).pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.allAvailableUsers = users;
    });
    this.store$.select(usersInCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.boardUsers = users.sort((a) => a._id === this.currentBoard?.owner || '' ? -1 : 1);
    });
    this.store$.select(invitedUsersInCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.selectedUsers = users;
    });
    this.store$.select(currentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe(board => {
      if (board) {
        this.currentBoard = board;
        this.newTitle = board.title;
      }
    });

    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentUserId = id || '';
    });

  }

  editeBoard() {
    this.store$.dispatch(startEditBoardAction());
    this.newTitle = this.currentBoard.title;
  }

  saveBoard() {
    this.store$.dispatch(stopEditBoardAction());
    if (this.newTitle === this.currentBoard.title
      && this.selectedUsers.map(item => item._id).sort().join() === [...this.currentBoard.users].sort().join()) {
      return;
    }
    this.store$.dispatch(updateBoardAction({
      newParams: {
        title: this.newTitle,
        users: this.selectedUsers.map(item => item._id),
        owner: this.currentBoard.owner,
      }, id: this.currentBoard._id,
    }));
  }

  cancelEdit() {
    this.newTitle = this.currentBoard.title;
    this.selectedUsers = this.boardUsers.filter(item => item._id !== this.currentBoard.owner);
    this.store$.dispatch(stopEditBoardAction());
  }

  deleteBoard() {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store$.dispatch(deleteBoardAction({ id: this.currentBoard._id }));
      }
    });
  }

  showBoard(board: BoardModel): void {
    this.router.navigate([`/board/${board._id}`]);
  }

  ngOnDestroy(): void {
    this.store$.dispatch(stopEditBoardAction());
    this.destroy$.next();
    this.destroy$.complete();
    this.store$.dispatch(clearCurrentBoardAction());
  }
}
