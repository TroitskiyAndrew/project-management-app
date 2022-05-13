import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { restoreUserAction } from '@redux/actions/users.actions';
import { AppState } from '@redux/state.models';
import { SocketService } from '@core/services/socket.service';
import { LocalizationService } from '@core/services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private store$: Store<AppState>, private localization: LocalizationService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.store$.dispatch(restoreUserAction());
    this.socketService.connect();
  }

  ngOnDestroy(): void {
    this.socketService.disconnet();
  }
}
