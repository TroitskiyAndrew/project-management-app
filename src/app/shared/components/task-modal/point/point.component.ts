import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { Store } from '@ngrx/store';
import { deletePointAction, updatePointAction } from '@redux/actions/points.actions';
import { AppState } from '@redux/state.models';
import { NewPointModel, PointFace, PointModel } from '@shared/models/board.model';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss'],
})
export class PointComponent {
  @Input() point!: PointModel | null;

  @Input() futurePoint!: PointFace | null;

  @Input() index!: number;

  @Output() pointDeleter = new EventEmitter<number>();

  public isEditable = false;

  constructor(private store$: Store<AppState>, private confirmService: ConfirmService) { }

  update(done: boolean) {
    if (this.point) {
      const point: NewPointModel = {
        title: this.point.title,
        taskId: this.point.taskId,
        boardId: this.point.boardId,
        done: done,
      };
      this.store$.dispatch(updatePointAction({ newParams: point, id: this.point._id }));
    } else if (this.futurePoint) {
      this.futurePoint.done = done;
    }
  }

  updatePointTitle(newTitle: string) {
    if (newTitle.trim()) {
      if (this.point) {
        const point: NewPointModel = {
          title: newTitle,
          taskId: this.point.taskId,
          boardId: this.point.boardId,
          done: this.point.done,
        };

        this.store$.dispatch(updatePointAction({ newParams: point, id: this.point._id }));
      } else if (this.futurePoint) {
        this.futurePoint.title = newTitle;
      }
    }

    this.isEditable = false;
  }

  deletePoint() {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        if (this.point) {
          this.store$.dispatch(deletePointAction({ id: this.point._id }));
        } else {
          this.pointDeleter.emit(this.index);
        }
      }
    });

  }
}
