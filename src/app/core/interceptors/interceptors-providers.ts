import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { UrlInterceptor } from '@core/interceptors/url.interceptor';
import { TokenInterceptor } from '@core/interceptors/token.interceptor';

export const HttpInterceptorProviders: Provider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UrlInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
];

