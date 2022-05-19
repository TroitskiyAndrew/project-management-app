import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { NewPointModel, PointModel } from '@shared/models/board.model';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsService implements OnDestroy {

  private currentUserId!: string;

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private store$: Store<AppState>) {
    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentUserId = id || '';
    });
  }

  public getPointsByUser(): Observable<PointModel[]> {
    return this.http.get<PointModel[]>('points', { params: new HttpParams().set('userId', this.currentUserId) });
  }

  public getPointsByIds(ids: string[]): Observable<PointModel[]> {
    return this.http.get<PointModel[]>('points', { params: new HttpParams().set('ids', ids.join(', ')) });
  }

  public createPoint(body: NewPointModel): Observable<PointModel> {
    return this.http.post<PointModel>('points', body, { headers: { 'Content-Type': 'application/json' } });
  }

  public updatePoint(body: NewPointModel, id: string): Observable<PointModel> {
    return this.http.put<PointModel>(`points/${id}`, body, { headers: { 'Content-Type': 'application/json' } });
  }

  public updateSetOfPoint(tasks: PointModel[]): Observable<PointModel[]> {
    return this.http.patch<PointModel[]>('points', { tasks }, { headers: { 'Content-Type': 'application/json' } });
  }

  public deletePoint(id: string): Observable<PointModel> {
    return this.http.delete<PointModel>(`points/${id}`);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
