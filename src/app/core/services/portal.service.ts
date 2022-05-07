import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { PortalData } from '@core/models/common.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortalService {

  readonly portal$ = new Subject<ComponentPortal<any> | null>();

  public data: PortalData = {};

  openComponent(component: ComponentType<any>, data?: PortalData): void {
    if (data) {
      this.data = data;
    }
    const portal = new ComponentPortal(component);
    this.portal$.next(portal);
  }

  close(): void {
    this.portal$.next(null);
    this.data = {};
  }


}
