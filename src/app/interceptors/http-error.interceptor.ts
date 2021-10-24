import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { catchError } from 'rxjs/operators'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private readonly errorTexts: Record<number, string> = {
    403: 'You do not have the right permissions to access this resource!',
    404: 'The requested resource could not be found!',
    405: 'We apologize, an error has occurred!',
    500: 'We apologize, a server error has occurred!',
    501: 'We apologize, a server error has occurred!',
    502: 'We apologize, a server error has occurred!',
    503: 'We apologize, a server error has occurred!',
    504: 'We apologize, a server error has occurred!',
    505: 'We apologize, a server error has occurred!',
    506: 'We apologize, a server error has occurred!',
    507: 'We apologize, a server error has occurred!',
    508: 'We apologize, a server error has occurred!',
    509: 'We apologize, a server error has occurred!',
    510: 'We apologize, a server error has occurred!',
    511: 'We apologize, a server error has occurred!',
  }

  constructor (private readonly msgService: MessageService) {
  }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return next.handle(request)
        }
        if (this.errorTexts[err.status] !== undefined) {
          this.msgService.add({ severity: 'error', detail: this.errorTexts[err.status] })
        } else {
          this.msgService.add({ severity: 'error', detail: 'We apologize, an error has occurred!' })
        }
        return throwError(err)
      },
      ),
    )
  }
}
