import { AccordionModule } from 'primeng/accordion'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { BadgeModule } from 'primeng/badge'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { CheckboxModule } from 'primeng/checkbox'
import { ChipModule } from 'primeng/chip'
import { CommonModule } from '@angular/common'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { DropdownModule } from 'primeng/dropdown'
import { FieldsetModule } from 'primeng/fieldset'
import { FileUploadModule } from 'primeng/fileupload'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MenubarModule } from 'primeng/menubar'
import { MessageModule } from 'primeng/message'
import { MessagesModule } from 'primeng/messages'
import { NgModule } from '@angular/core'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { PanelModule } from 'primeng/panel'
import { ProgressBarModule } from 'primeng/progressbar'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { RadioButtonModule } from 'primeng/radiobutton'
import { RippleModule } from 'primeng/ripple'
import { SelectButtonModule } from 'primeng/selectbutton'
import { TabMenuModule } from 'primeng/tabmenu'
import { TabViewModule } from 'primeng/tabview'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { TooltipModule } from 'primeng/tooltip'
import { TreeModule } from 'primeng/tree'
import { TreeTableModule } from 'primeng/treetable'

const modules = [
  AccordionModule,
  AutoCompleteModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CheckboxModule,
  ChipModule,
  ConfirmPopupModule,
  DropdownModule,
  FieldsetModule,
  FileUploadModule,
  InputTextModule,
  InputTextareaModule,
  MenubarModule,
  MessageModule,
  MessagesModule,
  OverlayPanelModule,
  PanelModule,
  ProgressBarModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  RippleModule,
  SelectButtonModule,
  TabViewModule,
  TableModule,
  TabMenuModule,
  ToastModule,
  TooltipModule,
  TreeModule,
  TreeTableModule,
]

/**
 * Imports only the modules we need from PrimeNg
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules,
  ],
  exports: modules,
})
export class PrimeNgModule {}
