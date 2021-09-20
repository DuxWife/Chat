import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {WebsocketService} from "../../services/websocket/websocket.service";
import {Room, User} from "../../models";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomePageComponent implements OnInit, OnDestroy {
  currentUser: User = {} as User;
  users: User[] = [];
  rooms: Room[] = [];

  currentUserSubscription: Subscription;
  usersSubscription: Subscription;
  roomsSubscription: Subscription;

  constructor(private websocketService: WebsocketService) {
    this.currentUserSubscription = this.websocketService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
    this.usersSubscription = this.websocketService.usersStore.subscribe(res => {
      this.users = res;
    });
    this.roomsSubscription = this.websocketService.roomsStore.subscribe(res => {
      this.rooms = res;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
    this.roomsSubscription.unsubscribe();
  }

  changeUserName(e: string) {
    this.websocketService.changeUserName(e);
  }

  createRoom(e: string) {
    this.websocketService.createRoom(e);
  }
}
