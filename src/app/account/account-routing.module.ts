import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { LoginComponent } from '../login/login.component'
// import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'user/:username', component: ProfileComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
