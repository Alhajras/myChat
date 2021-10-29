import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, interval, of } from 'rxjs'
import { catchError, debounce, delay, map, retry } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import {UserService} from "../user/user.service";

/***
 * Checks whether the user is logged in and if not, will redirect them to the login page.
 *
 * If a user becomes de-authenticated while mid-task or AFK, this will not interupt what they are doing and force a redirect
 */
@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor (private readonly userService: UserService, private readonly router: Router) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isAuthenticated().pipe(
      debounce(() => interval(100)),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          throw new Error('Not authenticated. Retrying...')
        }
        return isAuthenticated
      }),
      delay(100),
      retry(10),
      catchError(() => of(false)),
    )
  }
}
