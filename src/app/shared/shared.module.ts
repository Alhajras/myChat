import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ConfirmationService } from 'primeng/api'
import { ListboxModule } from 'primeng/listbox'
import { NgModule } from '@angular/core'
import { PrimeNgModule } from './primeng/prime-ng.module'
import { RouterModule } from '@angular/router'
import { TooltipModule } from 'primeng/tooltip'
import { TreeModule } from 'primeng/tree'
import { TreeTableModule } from 'primeng/treetable'
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';


/**
 * Components, directives, and pipes that are used in many parts of the app should be imported and exported here.
 *
 * Please take case that they have no references or dependencies on any other part of the app.
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DividerModule,
    ListboxModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    PasswordModule
  ],
  exports: [
    PrimeNgModule, ReactiveFormsModule, CommonModule, FormsModule],
  providers: [
    ConfirmationService,
    PrimeNgModule, ReactiveFormsModule, CommonModule],
})
export class SharedModule {}
