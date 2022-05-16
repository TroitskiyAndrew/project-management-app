import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { deletePointAction, updatePointAction } from '@redux/actions/points.actions';
import { AppState } from '@redux/state.models';
import { NewPointModel, PointModel } from '@shared/models/board.model';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss'],
})
export class PointComponent {
  @Input() point!: PointModel;

  public isEditable = false;

  constructor(private store$: Store<AppState>) { }

  update(done: boolean) {
    const point: NewPointModel = {
      title: this.point.title,
      taskId: this.point.taskId,
      boardId: this.point.boardId,
      done: done,
    };

    this.store$.dispatch(updatePointAction({ newParams: point, id: this.point._id }));
  }

  updatePointTitle(newTitle: string) {
    if (newTitle.trim()) {
      const point: NewPointModel = {
        title: newTitle,
        taskId: this.point.taskId,
        boardId: this.point.boardId,
        done: this.point.done,
      };

      this.store$.dispatch(updatePointAction({ newParams: point, id: this.point._id }));
    }

    this.isEditable = false;
  }

  deletePoint() {
    this.store$.dispatch(deletePointAction({ id: this.point._id }));
  }
}
