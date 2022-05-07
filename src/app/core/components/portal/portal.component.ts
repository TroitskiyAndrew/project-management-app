import { ComponentPortal } from '@angular/cdk/portal';
import { Component, HostListener, OnInit } from '@angular/core';
import { PortalService } from '@core/services/portal.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {

  public portal!: ComponentPortal<any>;

  public open = false;

  constructor(private portalService: PortalService) { }

  ngOnInit(): void {
    this.portalService.portal$.subscribe((val: ComponentPortal<any> | null) => {
      if (val) {
        this.portal = val;
        this.open = true;
      } else {
        this.portal.detach();
        this.open = false;
      }
    });
  }

  @HostListener('window:keyup.esc', ['$event'])
  closeByEsc(): void {
    this.close();
  }

  close(): void {
    this.portalService.close();
  }

}
