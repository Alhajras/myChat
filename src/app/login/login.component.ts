import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import {DividerModule} from 'primeng/divider';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username!: FormControl
  password: FormControl
  form: FormGroup

  constructor (
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.password = this.fb.control('', [Validators.required])
    this.form = this.fb.group({
      password: this.password,
    })
  }

  ngOnInit (): void {
  }

  login () {

  }

  private proceedToRedirect () {
  }
}
