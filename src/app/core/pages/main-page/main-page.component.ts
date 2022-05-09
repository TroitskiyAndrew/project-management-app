import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBoardsAction } from '@redux/actions/boards.actions';
import { boardsSelector } from '@redux/selectors/boards.selectors';
import { selectCurrentUser } from '@redux/selectors/current-user.selectors';
import { AppState, BoardsState } from '@redux/state.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public currentUser$ = this.store.select(selectCurrentUser);

  public userBoards$: Observable<BoardsState> = this.store.select(boardsSelector);

  public isLogged: boolean = false;

  panelOpenState = false;

  sidebarOpenState = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentUser$.subscribe((value) => {
      this.isLogged = !!value;
    });
    this.userBoards$.subscribe((value: any) => console.log(value));
    this.store.dispatch(getBoardsAction());
  }
}
