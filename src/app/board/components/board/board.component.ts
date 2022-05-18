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
import { NotifService } from '@core/services/notif.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public columns!: ColumnModel[];

  private dropPending: boolean = false;

  constructor(private store$: Store<AppState>, private portalService: PortalService, private notifier: NotifService) { }

  ngOnInit(): void {
    this.store$.select(columnsByCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe(columns => this.columns = columns.sort((a, b) => a.order - b.order));
  }

  openListModal(): void {
    this.portalService.openComponent(NewListModalComponent);
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.currentIndex == event.previousIndex) {
      return;
    }

    if (this.dropPending) {
      this.notifier.notify('warning', 'wait a second, please');
      return;
    }
    const target = { ...this.columns[event.previousIndex] };
    const affectedIndex = event.currentIndex > event.previousIndex ? event.currentIndex : event.currentIndex - 1;
    const affectedColumns = this.columns.filter((column, index) => index > affectedIndex && column._id != target._id);
    let result: ColumnModel[] = [];
    if (affectedColumns.length > 0) {
      result = [...affectedColumns.map(column => ({ ...column, order: column.order + 1 }))];
      target.order = Math.min(...affectedColumns.map(column => column.order));
    } else {
      target.order = Math.max(...this.columns.map(column => column.order)) + 1;
    }
    result.push(target);
    this.store$.dispatch(updateSetOfColumnsAction({ columns: result }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
