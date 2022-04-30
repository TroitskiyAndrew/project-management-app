import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getBoardsAction } from '@redux/actions/tasks.actions';
import { tasksSelector } from '@redux/selectors/tasks.selectors';
import { AppState, TasksState } from '@redux/state.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
})
export class WorkspacePageComponent implements OnInit {
  panelOpenState = false;

  sidebarOpenState = false;

  boards$: Observable<TasksState> = this.store.pipe(select(tasksSelector));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getBoardsAction());
  }
}
