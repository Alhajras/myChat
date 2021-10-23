import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from "./chat.component";
import { ChatRoutingModule } from "./chat-routing.module";
import { SharedModule } from "../shared/shared.module";
import {AvatarModule} from "primeng/avatar";
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
    AvatarModule,
    DividerModule
  ],
  exports: [
    ChatComponent,
  ],
})
export class ChatModule { }
