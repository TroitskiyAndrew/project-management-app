import { InjectionToken } from '@angular/core';

export const environment = {
  production: true,
  baseUrl: 'https://angular-manager-back-new.herokuapp.com',
  portalDataToken: new InjectionToken<{}>('PortalData'),
};
