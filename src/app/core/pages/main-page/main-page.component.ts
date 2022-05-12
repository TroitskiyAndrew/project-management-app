import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { allBoardsSelector } from '@redux/selectors/boards.selectors';
import { selectCurrentUser } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { BoardModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public currentUser$ = this.store.select(selectCurrentUser);

  public userBoards$: Observable<BoardModel[]> =
    this.store.select(allBoardsSelector);

  public isLogged = false;

  public panelOpenState = false;

  public sidebarOpenState = false;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.currentUser$.subscribe((value) => {
      this.isLogged = !!value;
    });
  }

  showBoard(board: BoardModel): void {
    this.router.navigate([`/board/${board._id}`]);
  }
}
