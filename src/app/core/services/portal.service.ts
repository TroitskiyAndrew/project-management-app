import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { PortalData } from '@core/models/common.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortalService {

  constructor(private injector: Injector) {

  }

  private activePotral = new Subject<ComponentPortal<any> | null>();

  readonly portal$ = this.activePotral.asObservable();

  private createInjector(data: PortalData): Injector {

    const injectorTokens = new WeakMap<any, any>([
      [environment.portalDataToken, data],
    ]);
    return new PortalInjector(this.injector, injectorTokens);
  }

  openComponent(component: ComponentType<any>, data: PortalData = {}): void {
    const portal = new ComponentPortal(component, null, this.createInjector(data));
    this.activePotral.next(portal);
  }

  close(): void {
    this.activePotral.next(null);
  }


}
