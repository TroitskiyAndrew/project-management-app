import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { columnsByCurrentBoardSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NewListModalComponent } from 'src/app/board/components/new-list-modal/new-list-modal.component';
import { ColumnModel } from '@shared/models/board.model';
import { Subject, takeUntil } from 'rxjs';
import { PortalService } from '@core/services/portal.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { updateSetOfColumnsAction } from '@redux/actions/columns.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public columns!: ColumnModel[];

  constructor(private store$: Store<AppState>, private portalService: PortalService) { }

  ngOnInit(): void {
    this.store$.select(columnsByCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe(columns => this.columns = columns);
  }

  openListModal(): void {
    this.portalService.openComponent(NewListModalComponent);
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.columns.sort((a: ColumnModel, b: ColumnModel) => a.order - b.order);
    const start = Math.min(event.currentIndex, event.previousIndex);
    const end = Math.max(event.currentIndex, event.previousIndex);
    const forward = event.currentIndex > event.previousIndex;
    this.columns.sort((a: ColumnModel, b: ColumnModel) => a.order - b.order);
    const target = this.columns[event.previousIndex];
    const affectedColumns = this.columns.filter((_, index) => index > start || index < end);
    let result: ColumnModel[] = [];
    if (forward) {
      result = [...affectedColumns.map(column => ({ ...column, order: column.order - 1 }))];
      result.push({
        ...target,
        order: Math.max(...affectedColumns.map(column => column.order)) + 1,
      });
    } else {
      result = [...affectedColumns.map(column => ({ ...column, order: column.order + 1 }))];
      result.push({
        ...target,
        order: Math.max(...affectedColumns.map(column => column.order)) - 1,
      });
    }
    this.store$.dispatch(updateSetOfColumnsAction({ columns: [...affectedColumns, target] }));
    console.log(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
