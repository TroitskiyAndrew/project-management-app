import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { columnsByCurrentBoardSelector, currentBoardSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NewListModalComponent } from 'src/app/board/components/new-list-modal/new-list-modal.component';
import { BoardModel, ColumnModel, NewColumnModel } from '@shared/models/board.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { createColumnAction } from '@redux/actions/columns.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private currentBoard$: Observable<BoardModel | null> = this.store$.select(currentBoardSelector);

  private currentBoardId!: string | undefined;

  private existedColumnsCount!: number;

  private destroy$ = new Subject<void>();

  public columns$: Observable<ColumnModel[]> = this.store$.select(columnsByCurrentBoardSelector);

  constructor(private store$: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentBoard$.subscribe(res => this.currentBoardId = res?._id);
    this.store$.select(columnsByCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe((columns) => {
      this.existedColumnsCount = columns.length;
    });
  }

  openListModal(): void {
    const dialogRef = this.dialog.open(NewListModalComponent, {
      panelClass: 'dialog__panel',
      hasBackdrop: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const newColumn: NewColumnModel = {
          ...res,
          boardId: this.currentBoardId,
          order: this.existedColumnsCount + 1,
        };
        this.store$.dispatch(createColumnAction({ newColumn }),
        );
      }
    });
  }
}
