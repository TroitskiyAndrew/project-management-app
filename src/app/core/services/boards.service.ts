import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { successResponseAction } from '@redux/actions/api-respone.actions';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { BoardModel, NewBoardModel } from '@shared/models/board.model';
import { Observable, Subject, takeUntil, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BoardsService implements OnDestroy {

  private currentUserId!: string;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private store$: Store<AppState>, private router: Router) {
    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentUserId = id || '';
    });
  }

  public getBoardsByUser(): Observable<BoardModel[]> {
    return this.http.get<BoardModel[]>(`boardsSet/${this.currentUserId}`);
  }

  public getBoardsByIds(ids: string[]): Observable<BoardModel[]> {
    return this.http.get<BoardModel[]>('boardsSet', { params: new HttpParams().set('ids', ids.join(', ')) });
  }

  public findBoard(id: string): Observable<BoardModel | null> {
    return this.http.get<BoardModel>(`boards/${id}`);
  }

  public createBoard(body: NewBoardModel): Observable<BoardModel> {
    return this.http.post<BoardModel>('boards', body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((board: BoardModel) => {
        this.store$.dispatch(successResponseAction({ message: board.title + ' ${notifications.board.create}' }));
        this.router.navigate(['board', board._id]);
      }),
    );
  }

  public updateBoard(body: NewBoardModel, id: string): Observable<BoardModel> {
    return this.http.put<BoardModel>(`boards/${id}`, body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((board) => this.store$.dispatch(successResponseAction({ message: board.title + ' ${notifications.board.update}' }))),
    );
  }

  public deleteBoard(id: string): Observable<BoardModel> {
    return this.http.delete<BoardModel>(`boards/${id}`).pipe(
      tap((board) => this.store$.dispatch(successResponseAction({ message: board.title + ' ${notifications.board.delete}' }))),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
