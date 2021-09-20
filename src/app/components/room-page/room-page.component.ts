import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {WebsocketService} from "../../services/websocket/websocket.service";
import {Subscription} from "rxjs";
import {Message, Room, User} from "../../models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RoomPageComponent implements OnInit, OnDestroy {
  roomId: string = '';
  currentUser: User = {} as User;
  currentRoom: Room | undefined = {} as Room;
  rooms: Room[] = [];

  currentUserSubscription: Subscription;
  roomsSubscription: Subscription;

  constructor(private websocketService: WebsocketService, private activeRoute: ActivatedRoute, private router: Router) {
    this.currentUserSubscription = this.websocketService.currentUser.subscribe(res => {
      this.currentUser = res;
    });
    this.roomsSubscription = this.websocketService.roomsStore.subscribe(res => {
      this.rooms = res;
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.roomId = params['id'];
        this.currentRoom = this.rooms.find(room => room.id === this.roomId);
        if(!this.currentRoom) this.router.navigate(['/']);
        this.websocketService.joinRoom(this.roomId);
      }
    });
  }

  ngOnDestroy(): void {
    this.websocketService.leaveRoom(this.roomId);
  }

  changeUserName(e: string) {
    this.websocketService.changeUserName(e);
  }

  sendMessage(e: string) {
    this.websocketService.sendMessage(this.roomId, e);
  }

}
