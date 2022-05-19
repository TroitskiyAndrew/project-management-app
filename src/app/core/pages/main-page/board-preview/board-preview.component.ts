import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmService } from '@core/services/confirm.service';
import { Store } from '@ngrx/store';
import { deleteBoardAction } from '@redux/actions/boards.actions';
import { columnsByBoarIdSelector } from '@redux/selectors/boards.selectors';
import { selectCurrentUserId } from '@redux/selectors/users.selectors';
import { AppState } from '@redux/state.models';
import { BoardModel, ColumnModel } from '@shared/models/board.model';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit, OnDestroy {
  @Input() board!: BoardModel;

  private destroy$ = new Subject<void>();

  public columns$!: Observable<ColumnModel[]>;

  private currentUserId!: string | null;

  public canUserDeleteBoard: boolean = false;

  constructor(private router: Router, private store: Store<AppState>, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.columns$ = this.store.select(columnsByBoarIdSelector(this.board._id));
    this.store.select(selectCurrentUserId).pipe(takeUntil(this.destroy$)).subscribe(id => this.currentUserId = id);
    if (this.currentUserId === this.board.owner) {
      this.canUserDeleteBoard = true;
    }
  }

  showBoard(board: BoardModel): void {
    this.router.navigate([`/board/${board._id}`]);
  }

  deleteBoard(board: BoardModel): void {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store.dispatch(deleteBoardAction({ id: board._id }));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
