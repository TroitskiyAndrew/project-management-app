import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { columnsByCurrentBoardSelector } from '@redux/selectors/boards.selectors';
import { AppState } from '@redux/state.models';
import { NewListModalComponent } from 'src/app/board/components/new-list-modal/new-list-modal.component';
import { ColumnModel } from '@shared/models/board.model';
import { Observable } from 'rxjs';
import { PortalService } from '@core/services/portal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {

  public columns$: Observable<ColumnModel[]> = this.store$.select(columnsByCurrentBoardSelector);

  constructor(private store$: Store<AppState>, public portalService: PortalService) { }


  openListModal(): void {
    this.portalService.openComponent(NewListModalComponent);
  }
}
