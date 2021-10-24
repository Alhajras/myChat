import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { catchError } from 'rxjs/operators'
import {UserService} from "../user/user.service";

@Injectable()
export class UnauthenticatedRequestInterceptor implements HttpInterceptor {
  constructor (private readonly msgService: MessageService, private readonly userService: UserService) {
  }

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone({})

    return next.handle(newRequest).pipe(
      catchError((response: unknown) => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401) {
            this.userService.logout().subscribe(() =>
              this.msgService.add({ severity: 'error', detail: 'You have been logged out. Please login again.', key: 'login-confirm' }),
            )
          }
        }
        return throwError(response)
      }),
    )
  }
}
