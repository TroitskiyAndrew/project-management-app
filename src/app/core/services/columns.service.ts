import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { errorResponseAction } from '@redux/actions/api-respone.actions';
import { currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { ColumnModel, NewColumnModel } from '@shared/models/board.model';
import { Subscription, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService implements OnDestroy {

  private currentBoardId!: string | null;

  private idSubs!: Subscription;

  constructor(private http: HttpClient, private store$: Store<AppState>) {
    this.idSubs = this.store$.select(currentBoardIdSelector).subscribe(id => {
      this.currentBoardId = id;
    });
  }

  public getColumns(boards: string[]): Observable<ColumnModel[] | null> {
    return this.http.get<ColumnModel[]>('columnsSet', { params: new HttpParams().set('boards', boards.join(', ')) }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  public createColumn(body: NewColumnModel): Observable<ColumnModel | null> {
    return this.http.post<ColumnModel>(this.getUrl(), body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public updateColumn(body: NewColumnModel, id: string): Observable<ColumnModel | null> {
    return this.http.put<ColumnModel>(`${this.getUrl()}/${id}`, body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public updateSetOfColumns(columns: ColumnModel[]): Observable<ColumnModel[] | null> {
    return this.http.patch<ColumnModel[]>('columnsSet', { columns }, { headers: { 'Content-Type': 'application/json' } }).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }),
    );
  }

  public deleteColumn(id: string): Observable<ColumnModel | null> {
    return this.http.delete<ColumnModel>(`${this.getUrl()}/${id}`).pipe(
      catchError((error) => {
        this.store$.dispatch(errorResponseAction({ error: error.error }));
        return of(null);
      }));
  }

  private getUrl(): string {
    return `boards/${this.currentBoardId}/columns`;
  }

  ngOnDestroy(): void {
    this.idSubs.unsubscribe();
  }
}
