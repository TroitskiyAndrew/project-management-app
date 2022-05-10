import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getBoardsAction } from '@redux/actions/boards.actions';
import { boardsSelector } from '@redux/selectors/boards.selectors';
// import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState, BoardsState } from '@redux/state.models';
import { BoardModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
// import { AppState } from '@redux/state.models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public currentUser$ = this.store.select(selectCurrentUser);

  public userBoards$: Observable<BoardsState> =
    this.store.select(boardsSelector);

  public isLogged = false;

  public panelOpenState = false;

  public sidebarOpenState = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.currentUser$.subscribe((value) => {
      this.isLogged = !!value;
    });
    this.userBoards$.subscribe((value: any) => console.log(value));
    this.store.dispatch(getBoardsAction());
  }

  showBoard(board: BoardModel): void {
    this.router.navigate([`/board/${board._id}`]);
  }
}
