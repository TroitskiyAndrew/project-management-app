import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { createColumnAction } from '@redux/actions/columns.actions';
import { columnsByCurrentBoardSelector, currentBoardIdSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NewColumnModel } from '@shared/models/board.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-list-modal',
  templateUrl: './new-list-modal.component.html',
  styleUrls: ['./new-list-modal.component.scss'],
})
export class NewListModalComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public createListForm!: FormGroup;

  private currentBoardId!: string;

  private currentMaxOrder!: number;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
  ) { }

  ngOnInit(): void {
    this.createListForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
    this.store$.select(currentBoardIdSelector).pipe(takeUntil(this.destroy$)).subscribe((id) => {
      if (id) {
        this.currentBoardId = id;
      }
    });
    this.store$.select(columnsByCurrentBoardSelector).pipe(takeUntil(this.destroy$)).subscribe((columns) => {
      if (columns.length === 0) {
        this.currentMaxOrder = 0;
      } else {
        this.currentMaxOrder = Math.max(...columns.map(column => column.order));
      }
    });
  }

  onSubmit(): void {
    const newColumn: NewColumnModel = {
      ...this.createListForm.value,
      boardId: this.currentBoardId,
      order: this.currentMaxOrder + 1,
    };
    this.store$.dispatch(createColumnAction({ newColumn }),
    );
    this.portalService.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
