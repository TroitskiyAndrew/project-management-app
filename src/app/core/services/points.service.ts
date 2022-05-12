import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NewPointModel, PointModel } from '@shared/models/board.model';
import { catchError, Observable, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsService implements OnDestroy {

  private currentBoardId!: string | null;

  private idSubs!: Subscription;

  constructor(private http: HttpClient, private store$: Store<AppState>) {
    this.idSubs = this.store$.select(currentBoardIdSelector).subscribe(id => {
      this.currentBoardId = id;
    });
  }

  public getPoints(boards: string[]): Observable<PointModel[] | null> {
    return this.http.get<PointModel[]>('points', { params: new HttpParams().set('boards', boards.join(', ')) }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public createPoint(body: NewPointModel): Observable<PointModel | null> {
    return this.http.post<PointModel>('points', body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public updatePoint(body: NewPointModel, id: string): Observable<PointModel | null> {
    return this.http.put<PointModel>(`points/${id}`, body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public updateSetOfPoint(tasks: PointModel[]): Observable<PointModel[] | null> {
    return this.http.patch<PointModel[]>('points', { tasks }, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public deletePoint(id: string): Observable<PointModel | null> {
    return this.http.delete<PointModel>(`points/${id}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }


  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
  }
}
