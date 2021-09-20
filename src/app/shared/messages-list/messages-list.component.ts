import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Message, User} from "../../models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MessagesListComponent implements OnInit {
  @Input() currentUser: User = {} as User;
  @Input() users: User[] = [];
  @Input() messages: Message[] = [];
  @Output() sendMessageEvent = new EventEmitter<string>();

  messageForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  options = {
    era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.sendMessageEvent.emit(this.messageForm.value.message);
    this.messageForm.patchValue({message: ''});
  }

  getUserName(userId: string) {
    return this.users.find(user => user.id === userId)?.name;
  }

}
