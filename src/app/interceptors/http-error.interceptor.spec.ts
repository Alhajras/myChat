import { HttpClient, HttpHandler } from '@angular/common/http'
import { HttpErrorInterceptor } from './http-error.interceptor'
import { MessageService } from 'primeng/api'
import { PreonDockAPIClient } from '../clients/preondock-api.client'
import { TestBed } from '@angular/core/testing'
import { throwError } from 'rxjs'

describe('HttpErrorInterceptor', () => {
  let httpRequestSpy
  let httpHandlerSpy
  const httpError = { status: 403, statusText: 'You do not have the right permissions to access this resource!' }

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpErrorInterceptor,
      MessageService,
      HttpClient,
      PreonDockAPIClient,
      HttpHandler,
    ],
  }))

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor)
    expect(interceptor).toBeTruthy()
  })

  it('should send message saying: The requested resource could not be found!', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor)
    httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter'])
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle'])
    httpHandlerSpy.handle.and.returnValue(throwError(httpError))

    interceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => console.log('good', result),
        err => {
          console.log('error', err)
          expect(err.status).toEqual(403)
          expect(err.statusText).toEqual('You do not have the right permissions to access this resource!')
        },
      )
  })
})
