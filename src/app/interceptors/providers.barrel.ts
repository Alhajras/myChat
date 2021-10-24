import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpErrorInterceptor } from './http-error.interceptor'
import { UnauthenticatedRequestInterceptor } from './unauthenticated-request.interceptor'

export const interceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: UnauthenticatedRequestInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
]
