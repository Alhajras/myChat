import { AccountRoutingModule } from './account-routing.module'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import {LoginComponent} from "../login/login.component";
import {SharedModule} from "../shared/shared.module";
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [
    LoginComponent,
    // ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
    FormsModule,
    DividerModule,
  ],
  exports: [],
})
export class AccountModule {}
