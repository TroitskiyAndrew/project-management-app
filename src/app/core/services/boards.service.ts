import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { errorResponseAction, successResponseAction } from '@redux/actions/api-respone.actions';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { BoardModel, NewBoardModel } from '@shared/models/board.model';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BoardsService implements OnDestroy {

  private currentUserId!: string;

  private idSubs!: Subscription;

  constructor(private http: HttpClient, private store$: Store<AppState>, private router: Router) {
    this.idSubs = this.store$.select(selectCurrentUserId).subscribe(id => {
      if (id) {
        this.currentUserId = id;
      }
    });
  }

  public getBoards(): Observable<BoardModel[] | null> {
    return this.http.get<BoardModel[]>(`boardsSet/${this.currentUserId}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public findBoard(id: string): Observable<BoardModel | null> {
    return this.http.get<BoardModel>(`boards/${id}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public createBoard(body: NewBoardModel): Observable<BoardModel | null> {
    return this.http.post<BoardModel>('boards', body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((board: BoardModel) => {
        this.router.navigate(['board', board._id]);
        this.store$.dispatch(successResponseAction({ message: 'Successfull created' }));
      }),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public updateBoard(body: NewBoardModel, id: string): Observable<BoardModel | null> {
    return this.http.put<BoardModel>(`boards/${id}`, body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap(() => this.store$.dispatch(successResponseAction({ message: 'Successfull updated' }))),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public deleteBoard(id: string): Observable<BoardModel | null> {
    return this.http.delete<BoardModel>(`boards/${id}`).pipe(
      tap(() => {
        this.store$.dispatch(successResponseAction({ message: 'Successfull deleted' }));
      }),
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
  }

}
