import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from "./chat.component";
import {ChatRoutingModule} from "./chat-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ],
  exports: [
    ChatComponent,
  ],
})
export class ChatModule { }
