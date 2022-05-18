import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { columnsByBoarIdSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { BoardModel, ColumnModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit {
  @Input() board!: BoardModel;

  public columns$!: Observable<ColumnModel[]>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.columns$ = this.store.select(columnsByBoarIdSelector(this.board._id));
  }

  showBoard(board: BoardModel): void {
    this.router.navigate([`/board/${board._id}`]);
  }

}
