import { HttpClient, HttpHandler } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { PreonDockAPIClient } from '../clients/preondock-api.client'
import { TestBed } from '@angular/core/testing'
import { UnauthenticatedRequestInterceptor } from './unauthenticated-request.interceptor'

describe('UnauthenticatedRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnauthenticatedRequestInterceptor,
      MessageService,
      HttpClient,
      PreonDockAPIClient,
      HttpHandler,
    ],
  }))

  it('should be created', () => {
    const interceptor: UnauthenticatedRequestInterceptor = TestBed.inject(UnauthenticatedRequestInterceptor)
    expect(interceptor).toBeTruthy()
  })
})
