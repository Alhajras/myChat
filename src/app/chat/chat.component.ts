import {ConfirmationService, MenuItem, MessageService} from 'primeng/api'
import {ChatMessage, ChatUser, Conversation, Customer} from './models/model'
import {Component, ViewChildren} from '@angular/core'
import {CountryService} from './service/country.service'
import {CustomerService} from './service/customer.service'
import {OverlayPanel} from 'primeng/overlaypanel'
import {ProductService} from './service/product.service'
import {WebSocketSubject} from "rxjs/internal-compatibility";
import {ChatMessageService} from "./service/chat-message.service";
import {FormControl} from "@angular/forms";
import {HttpParams} from "@angular/common/http";

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
  users: ChatUser[] = []
  messages: ChatMessage[] = []
  conversations: Conversation[] = []
  selectedCustomers: Customer[] = []
  tieredMenuItems: MenuItem[]
  textArea = new FormControl('')
  @ViewChildren('chatbox') messageBody!: any
  selectedConversation!: Conversation;
  totalMessages = 0
  nextOffset = 0
  scrollDown = true

  constructor(private readonly countryService: CountryService, private readonly messageService: MessageService,
              private readonly customerService: CustomerService, private readonly productService: ProductService, private readonly chatMessageServie: ChatMessageService,
              private readonly confirmationService: ConfirmationService) {
    // this.messageBody.scrollTop = this.messageBody.scrollHeight - this.messageBody.clientHeight ;
    //     this.messageBody.scrollTop = this.messageBody.scrollHeight  ;
    var endpoint = "ws://" + 'localhost:8000' + '/ws/messages/'
    // let websocket = new WebSocket(endpoint)

    this.chatMessageServie.getList<ChatUser>('users').subscribe(
      data => {
        this.users = data.results
      },
      (error: unknown) => {
        console.log(error)
      })

    this.chatMessageServie.getList<Conversation>('conversations').subscribe(
      data => {
        this.conversations = data.results
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

  ngAfterViewInit() {
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
      channel: 'Local',
      deleted: false,
      sender: 1,
      conversation: 1
    }
    this.chatMessageServie.postMessage(message).subscribe(
      data => {
        this.scrollDown = true
        this.messages.push(message)
      },
      (error: unknown) => {
        console.log(error)
      })
    this.textArea.setValue('')
  }

  /**
   * This is so expensive dont put heavy code
   * TODO fix this
   */
  ngAfterViewChecked() {
    if (this.scrollDown) {
      this.messageBody.last.nativeElement.scrollTop = this.messageBody.last.nativeElement.scrollHeight + 68.75;
    }
  }

  openConversation() {
    this.chatMessageServie.getList<ChatMessage>('messages').subscribe(
      data => {
        this.messages = data.results.reverse()
        this.totalMessages = data.count
        if (data.next) {
          this.nextOffset = +data.next.split('offset=')[1]
        }
      },
      (error: unknown) => {
        console.log(error)
      })
  }

  loadMore() {
    this.scrollDown = false
    const params = new HttpParams({fromObject: {offset: this.nextOffset}})
    this.chatMessageServie.getList<ChatMessage>('messages', params).subscribe(
      data => {
        this.messages = data.results.reverse().concat(this.messages)
        this.totalMessages = data.count
      },
      (error: unknown) => {
        console.log(error)
      })
  }

  mockConversation() {

  }

  mockMessage() {
    const length = 10
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    const message: ChatMessage = {
      message: result,
      timestamp: currentdate.getHours() + ":"
        + currentdate.getMinutes(),
      seen: false,
      channel: 'Local',
      deleted: false,
      sender: 2,
      conversation: 1
    }
    this.messages.push(message);

  }
}
