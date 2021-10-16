import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AccordionModule } from 'primeng/accordion'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { CardModule } from 'primeng/card'
import { CatalogComponent } from './catalog.component'
import { CatalogRoutingModule } from './catalog-routing.module'
import { CheckboxModule } from 'primeng/checkbox'
import { ChipsModule } from 'primeng/chips'
import { CommonModule } from '@angular/common'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ContextMenuModule } from 'primeng/contextmenu'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { FieldsetModule } from 'primeng/fieldset'
import { FormsModule } from '@angular/forms'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputSwitchModule } from 'primeng/inputswitch'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ListboxModule } from 'primeng/listbox'
import { MenuModule } from 'primeng/menu'
import { MenubarModule } from 'primeng/menubar'
import { MessageModule } from 'primeng/message'
import { MessagesModule } from 'primeng/messages'
import { MultiSelectModule } from 'primeng/multiselect'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { PanelModule } from 'primeng/panel'
import { ProgressBarModule } from 'primeng/progressbar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { RatingModule } from 'primeng/rating'
import { RippleModule } from 'primeng/ripple'
import { SelectButtonModule } from 'primeng/selectbutton'
import { SliderModule } from 'primeng/slider'
import { TabViewModule } from 'primeng/tabview'
import { TableModule } from 'primeng/table'
import { TieredMenuModule } from 'primeng/tieredmenu'
import { TimelineModule } from 'primeng/timeline'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { TooltipModule } from 'primeng/tooltip'

describe('CatalogComponentsComponent', () => {
  let component: CatalogComponent
  let fixture: ComponentFixture<CatalogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports: [
        AccordionModule,
        AutoCompleteModule,
        BrowserAnimationsModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CatalogRoutingModule,
        CheckboxModule,
        ChipsModule,
        CommonModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ContextMenuModule,
        DialogModule,
        DropdownModule,
        FieldsetModule,
        FormsModule,
        InputNumberModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        ListboxModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OverlayPanelModule,
        PanelModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        SelectButtonModule,
        SliderModule,
        TabViewModule,
        TableModule,
        TieredMenuModule,
        TimelineModule,
        ToggleButtonModule,
        TooltipModule,
      ],
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
