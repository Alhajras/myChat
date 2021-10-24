import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

/**
 * State to be shared between login, password reset, registration, and forgotten password views
 */
@Injectable({
  providedIn: 'root',
})
export class AccountStateService {
  public username$ = new BehaviorSubject<string>('')
  public password$ = new BehaviorSubject<string>('')
}
