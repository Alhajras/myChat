import {ConfirmationService, MenuItem, Message, MessageService, PrimeIcons} from 'primeng/api'
import {ChatMessage, Customer, Product} from './models/model'
import {Component, ElementRef, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core'
import {CountryService} from './service/country.service'
import {CustomerService} from './service/customer.service'
import {OverlayPanel} from 'primeng/overlaypanel'
import {ProductService} from './service/product.service'
import {WebSocketSubject} from "rxjs/internal-compatibility";
import {ChatMessageService} from "./service/chat-message.service";
import {FormControl} from "@angular/forms";

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
  customers: Customer[]
  messages: ChatMessage[] = []
  selectedCustomers: Customer[] = []
  tieredMenuItems: MenuItem[]
  textArea = new FormControl('')
  @ViewChildren('chatbox') messageBody!: any

  constructor(private readonly countryService: CountryService, private readonly messageService: MessageService,
              private readonly customerService: CustomerService, private readonly productService: ProductService, private readonly chatMessageServie: ChatMessageService,
              private readonly confirmationService: ConfirmationService) {
    // this.messageBody.scrollTop = this.messageBody.scrollHeight - this.messageBody.clientHeight ;
    //     this.messageBody.scrollTop = this.messageBody.scrollHeight  ;
    var endpoint = "ws://" + 'localhost:8000' + '/ws/messages/'
    console.log(endpoint)
    // let websocket = new WebSocket(endpoint)
        this.chatMessageServie.getMessages<ChatMessage>('messages').subscribe(
      data => {
        this.messages = data
        console.log(data)
      },
      (error: unknown) => {
        console.log(error)
      })

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
    this.customers = this.customerService.getCustomersLarge()
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


  }

  ngAfterViewInit () {
    this.messageBody.changes.subscribe(() => {
      if (this.messageBody.length > 0) {
        // We focus the most recently inserted name input when it is created
        // this.messageBody.last.nativeElement.focus()
      }
    })
  }

  onRowSelect($event: any, op: OverlayPanel) {
    // @ts-expect-error
    this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name})
    op.hide()
  }


  showToast(severity: string) {
    this.messageService.add({severity, summary: 'Message Summary', detail: 'Message Detail', life: 3000})
  }

  showConfirmPopup(target: HTMLButtonElement) {
    this.confirmationService.confirm({
      target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'})
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'})
      },
      key: 'popup',
    })
  }

  showConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'})
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'You have rejected'})
      },
      key: 'dialog',
    })
  }

  submitMessage() {
    this.textArea.setValue(this.textArea.value.trim())
    if (this.textArea.value === '') {
      return
    }

    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    const message: ChatMessage = {
      message: this.textArea.value,
      timestamp: currentdate.getHours() + ":"
        + currentdate.getMinutes(),
      seen: false,
      channel: 'Local'
    }
    this.messages.push(message)
    this.textArea.setValue('')
  }

  /**
   * This is so expensive dont put heavy code
   */
  ngAfterViewChecked() {
    this.messageBody.last.nativeElement.scrollTop = this.messageBody.last.nativeElement.scrollHeight+68.75;
  }

}
