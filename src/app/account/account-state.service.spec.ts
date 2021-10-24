import { AccountStateService } from './account-state.service'
import { TestBed } from '@angular/core/testing'

describe('AccountStateService', () => {
  let service: AccountStateService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AccountStateService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
