import {ActivatedRoute, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {UserService} from "../user/user.service";
import {take} from "rxjs/operators";
import {throwError} from "rxjs";
import {AccountStateService} from "../account/account-state.service";

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username!: FormControl
  password: FormControl
  form: FormGroup

  constructor(
    public accountState: AccountStateService,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.username = this.fb.control(this.accountState.username$.value, [Validators.required])
    this.password = this.fb.control('', [Validators.required])
    this.form = this.fb.group({
      username: this.username,
      password: this.password,
    })
    userService.isAuthenticated()
      .pipe(take(1))
      .subscribe(authenticated => {
        if (authenticated) {
          // In case someone tries to navigate directly to the login page, we redirect
          // todo: make this a guard
          this.proceedToRedirect()
        }
      })
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.form.value).toPromise()
      .then(async _ => await this.userService.loadSessionUser().toPromise())
      .then(user => {
        this.form.reset()

        // For demonstration only. Will be removed:
        console.log('You are logged in!')
        this.proceedToRedirect()
      })
      .catch(err => {
        // this.validationErrorService.setFormErrors(err, this.form)
        console.log('You are not logged in!')
        return throwError(err)
      })
  }

  /**
   * Authenticated users will be redirected either to `/` or to the previous page they were trying to access before logging in
   */
  private proceedToRedirect() {
    this.router.navigate([this.route.snapshot.queryParamMap.get('redirect') ?? '/chat'])
      .catch(async () => await this.router.navigate(['/chat']))
  }

}
