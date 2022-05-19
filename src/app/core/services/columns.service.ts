import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { successResponseAction } from '@redux/actions/api-respone.actions';
import { currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { ColumnModel, NewColumnModel } from '@shared/models/board.model';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService implements OnDestroy {

  private destroy$ = new Subject<void>();

  private currentBoardId!: string | null;

  private currentUserId!: string;

  constructor(private http: HttpClient, private store$: Store<AppState>, private router: Router) {
    this.store$.select(currentBoardIdSelector).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentBoardId = id;
    });
    this.store$.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.currentUserId = id || '';
    });
  }

  public getColumnsByUser(): Observable<ColumnModel[]> {
    return this.http.get<ColumnModel[]>('columnsSet', { params: new HttpParams().set('userId', this.currentUserId) });
  }

  public getColumnsByIds(ids: string[]): Observable<ColumnModel[]> {
    return this.http.get<ColumnModel[]>('columnsSet', { params: new HttpParams().set('ids', ids.join(', ')) });
  }

  public createColumn(body: NewColumnModel): Observable<ColumnModel> {
    return this.http.post<ColumnModel>(this.getUrl(), body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((column) => this.store$.dispatch(successResponseAction({ message: column.title + ' ${notifications.column.create}' }))),
    );
  }

  public updateColumn(body: NewColumnModel, id: string): Observable<ColumnModel> {
    return this.http.put<ColumnModel>(`${this.getUrl()}/${id}`, body, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap((column) => this.store$.dispatch(successResponseAction({ message: column.title + ' ${notifications.column.update}' }))),
    );
  }

  public updateSetOfColumns(columns: ColumnModel[]): Observable<ColumnModel[]> {
    return this.http.patch<ColumnModel[]>('columnsSet', { columns }, { headers: { 'Content-Type': 'application/json' } });
  }

  public deleteColumn(id: string): Observable<ColumnModel> {
    return this.http.delete<ColumnModel>(`${this.getUrl()}/${id}`).pipe(
      tap((column) => this.store$.dispatch(successResponseAction({ message: column.title + ' ${notifications.column.delete}' }))),
    );
  }

  private getUrl(): string {
    return `boards/${this.currentBoardId}/columns`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
