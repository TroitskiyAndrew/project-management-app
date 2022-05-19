import { Component, Input, OnInit } from '@angular/core';
import { ConfirmService } from '@core/services/confirm.service';
import { Store } from '@ngrx/store';
import { deleteFileAction } from '@redux/actions/files.actions';
import { AppState } from '@redux/state.models';
import { FileModel } from '@shared/models/board.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {

  @Input() file!: FileModel;

  public url!: string;

  constructor(private store$: Store<AppState>, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.url = `url("${environment.baseUrl}/${this.file.path}")`;
  }

  deleteFile(): void {
    this.confirmService.requestConfirm().subscribe((val) => {
      if (val) {
        this.store$.dispatch(deleteFileAction({ id: this.file._id }));
      }
    });
  }

  openFile(): void {
    window.open(`${environment.baseUrl}/${this.file.path}`);
  }

}
