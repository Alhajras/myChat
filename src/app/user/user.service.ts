import { map, tap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import {User} from "./user.model";
import {HttpApiClient} from "../http/http-api.client";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpointPath = 'users/'
  readonly user$ = new BehaviorSubject<User | null>(null)

  constructor (private readonly client: HttpApiClient) { }

  getCurrentUser () {
    return this.client.get<User>(this.endpointPath + 'me/')
  }

  getUser (username: string) {
    return this.client.get<User>(this.endpointPath + username)
  }

  login (credentials: { username: string; password: string }) {
    return this.client.post('auth/login/', credentials)
  }

  logout () {
    return this.client.post('auth/logout/').pipe(
      tap(_ => this.user$.next(null)),
    )
  }

  isAuthenticated () {
    return this.user$.pipe(
      map(user => user !== null),
    )
  }

  loadSessionUser () {
    return this.getCurrentUser().pipe(
      tap(user => this.user$.next(user)),
    )
  }
}
