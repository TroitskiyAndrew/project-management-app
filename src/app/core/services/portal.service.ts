import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, OnDestroy } from '@angular/core';
import { ConfirmData, PortalData } from '@core/models/common.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortalService implements OnDestroy {

  readonly portal$ = new Subject<ComponentPortal<any> | null>();

  public data!: PortalData | null;

  public confirmDialog!: ConfirmData | null;

  openComponent(component: ComponentType<any>, data?: PortalData): void {
    if (data) {
      this.data = data;
    }
    const portal = new ComponentPortal(component);
    this.portal$.next(portal);
  }

  close(): void {
    this.portal$.next(null);
    this.data = null;
    this.confirmDialog = null;
  }

  ngOnDestroy(): void {
    this.portal$.complete();
  }

}
