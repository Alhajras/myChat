import { HttpClientTestingModule } from '@angular/common/http/testing'
import { IsAuthenticatedGuard } from './is-authenticated.guard'
import { RouterTestingModule } from '@angular/router/testing'
import { TestBed } from '@angular/core/testing'

describe('IsAuthenticatedGuard', () => {
  let guard: IsAuthenticatedGuard

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterTestingModule, HttpClientTestingModule] })
    guard = TestBed.inject(IsAuthenticatedGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
