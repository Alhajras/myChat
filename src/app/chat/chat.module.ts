import { NgModule } from '@angular/core';
import { AvatarModule } from "primeng/avatar";
import { ChatComponent } from "./chat.component";
import { ChatRoutingModule } from "./chat-routing.module";
import { CommonModule } from '@angular/common';
import { DividerModule } from "primeng/divider";
import { SharedModule } from "../shared/shared.module";

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
