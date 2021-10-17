import { ConfirmationService, MenuItem, Message, MessageService, PrimeIcons } from 'primeng/api'
import { Customer, Product } from './models/model'
import { Component } from '@angular/core'
import { CountryService } from './service/country.service'
import { CustomerService } from './service/customer.service'
import { OverlayPanel } from 'primeng/overlaypanel'
import { ProductService } from './service/product.service'
import {WebSocketSubject} from "rxjs/internal-compatibility";

interface Option {
  name: string
  code: string
}

@Component({
  selector: 'mc-chat-components',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [MessageService, ConfirmationService],
})

export class ChatComponent {
  calendarValue: any
  checkboxValue = ''
  chipsValue = ''
  cities: Option[]
  contextMenuItems: MenuItem[]
  countries: any[]
  customers: Customer[]
  displayDialog = false
  dropdownValue: any
  events: any[]
  filteredCountries: any[] = []
  floatValue = ''
  inputNumberValue = 0
  listboxValue: any
  menuItems: MenuItem[]
  msgs: Message[]
  multiselectOptions: Option[]
  multiselectValue: Option[] = []
  products: Product[]
  radioValue = ''
  ratingValue = 0
  selectButtonOptions: Option[]
  selectButtonValue1: any
  selectButtonValue2: any
  selectedCountry: any
  selectedCustomers: Customer[] = []
  selectedProduct: any
  sliderValue = 0
  switchValue = false
  tieredMenuItems: MenuItem[]
  toggleValue = false
  constructor (private readonly countryService: CountryService, private readonly messageService: MessageService,
    private readonly customerService: CustomerService, private readonly productService: ProductService,
    private readonly confirmationService: ConfirmationService) {
    var endpoint = "ws://" + 'localhost:8000' + '/ws/messages/'
    console.log(endpoint)
    // let websocket = new WebSocket(endpoint)
    let socket$ = new WebSocketSubject(endpoint)
        socket$.subscribe(
            (data) => console.log(data),
            (err) => console.error(err),
            () => console.warn('Completed!')
        );
        socket$.next({
            event: 'events',
            data: 'test',
        });
    // websocket.onopen = function (e){
    //   console.log('opened', e)
    // }
    //     websocket.onerror = function (e){
    //   console.log('error', e)
    // }
    //         websocket.onclose = function (e){
    //   console.log('closed', e)
    // }
    this.countries = this.countryService.getCountries()
    this.products = this.productService.getProductsSmall()
    this.customers = this.customerService.getCustomersLarge()

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ]

    this.multiselectOptions = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ]

    this.selectButtonOptions = [
      { name: 'Option 1', code: 'O1' },
      { name: 'Option 2', code: 'O2' },
      { name: 'Option 3', code: 'O3' },
    ]

    this.tieredMenuItems = [
      {
        label: 'Customers',
        icon: 'pi pi-fw pi-table',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            items: [
              {
                label: 'Customer',
                icon: 'pi pi-fw pi-plus',
              },
              {
                label: 'Duplicate',
                icon: 'pi pi-fw pi-copy',
              },

            ],
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
          },
        ],
      },
      {
        label: 'Orders',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'View',
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
          },

        ],
      },
      {
        label: 'Shipments',
        icon: 'pi pi-fw pi-envelope',
        items: [
          {
            label: 'Tracker',
            icon: 'pi pi-fw pi-compass',

          },
          {
            label: 'Map',
            icon: 'pi pi-fw pi-map-marker',

          },
          {
            label: 'Manage',
            icon: 'pi pi-fw pi-pencil',
          },
        ],
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
          },
          {
            label: 'Billing',
            icon: 'pi pi-fw pi-file',
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-sign-out',
      },
    ]

    this.menuItems = [
      {
        label: 'Customers',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
          },
        ],
      },
      {
        label: 'Orders',
        items: [
          {
            label: 'View',
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-search',
          },

        ],
      },
    ]

    this.contextMenuItems = [
      {
        label: 'Save',
        icon: 'pi pi-save',
      },
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
      },
      {
        separator: true,
      },
      {
        label: 'Options',
        icon: 'pi pi-cog',
      },
    ]

    this.msgs = [
      { severity: 'success', summary: 'Success', detail: 'Message Content' },
      { severity: 'info', summary: 'Info', detail: 'Message Content' },
      { severity: 'warn', summary: 'Warning', detail: 'Message Content' },
      { severity: 'error', summary: 'Error', detail: 'Message Content' },
    ]

    this.events = [
      {
        status: 'Ordered',
        date: '15/10/2020 10:30',
        icon: PrimeIcons.SHOPPING_CART,
        color: '#9C27B0',
        image: 'default.jpg',
      },
      { status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' },
    ]
  }

  filterCountry ($event: any) {
    const filtered: any[] = []
    const query = 'aus'
    for (const country of this.countries) {
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country)
      }
    }

    this.filteredCountries = filtered
  }

  onRowSelect ($event: any, op: OverlayPanel) {
    // @ts-expect-error
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name })
    op.hide()
  }

  openDialog () {
    this.displayDialog = true
  }

  closeDialog () {
    this.displayDialog = false
  }

  showToast (severity: string) {
    this.messageService.add({ severity, summary: 'Message Summary', detail: 'Message Detail', life: 3000 })
  }

  showConfirmPopup (target: HTMLButtonElement) {
    this.confirmationService.confirm({
      target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' })
      },
      key: 'popup',
    })
  }

  showConfirmDialog () {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' })
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' })
      },
      key: 'dialog',
    })
  }
}
