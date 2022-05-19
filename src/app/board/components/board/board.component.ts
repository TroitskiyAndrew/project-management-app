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
import { dropBlockSelector } from '@redux/selectors/enviroment.selectors';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public columns!: ColumnModel[];

  private dropBlock: boolean = false;

  public isXSmall = false;

  constructor(private store$: Store<AppState>, private portalService: PortalService, private notifier: NotifService, private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.store$.select(columnsByCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe(columns => {
      this.columns = columns.sort((a, b) => a.order - b.order);
    });
    this.store$.select(dropBlockSelector).pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.dropBlock = val;
    });

    this.responsive.observe(Breakpoints.XSmall)
      .subscribe(result => {
        this.isXSmall = false;
        if (result.matches) {
          this.isXSmall = true;
        }
      });
  }

  openListModal(): void {
    this.portalService.openComponent(NewListModalComponent);
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.currentIndex == event.previousIndex) {
      return;
    }

    if (this.dropBlock) {
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
    const result2 = [...this.columns.map(it => ({ ...it })).filter(item => !result.map(it => it._id).includes(item._id)), ...result].sort((a, b) => a.order - b.order);
    result2.forEach((item, index) => item.order = index + 1);
    this.store$.dispatch(updateSetOfColumnsAction({ columns: result2 }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
