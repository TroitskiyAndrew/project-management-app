import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortalService } from '@core/services/portal.service';
import { Store } from '@ngrx/store';
import { findTasksSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { TaskModel } from '@shared/models/board.model';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public request: string = '';

  private resultsSubs!: Subscription;

  private currentTask$!: Subject<TaskModel>;

  public results!: TaskModel[];

  constructor(private store$: Store<AppState>, private portalService: PortalService, private router: Router) { }

  ngOnInit(): void {
    this.request = this.portalService.data!['request'] as string || '$EmptyRequest';
    this.currentTask$ = this.portalService.data!['taskSubject'] as Subject<TaskModel>;
    this.search();
  }

  search(): void {
    if (!this.request) {
      this.results = [];
      return;
    }
    if (this.resultsSubs) {
      this.resultsSubs.unsubscribe();
    }
    this.resultsSubs = this.store$.select(findTasksSelector(this.request)).pipe(takeUntil(this.destroy$)).subscribe((tasks => {
      if (tasks.length > 0) {
        setTimeout(() => { this.currentTask$.next(tasks[0]); }, 300);
      }
      this.results = tasks;
    }));
  }

  showTask(task: TaskModel): void {
    this.currentTask$.next(task);
  }

  goToBoard(boardId: string): void {
    this.router.navigate([`/board/${boardId}`]);
    this.portalService.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.currentTask$.complete();
  }

}
