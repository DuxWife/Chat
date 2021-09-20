import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Message, Room, User} from "../../models";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: any;

  currentUser = new BehaviorSubject<User>({} as User);
  usersStore = new BehaviorSubject<User[]>([]);
  roomsStore = new BehaviorSubject<Room[]>([]);
  constructor(private router: Router) {
    this.socket = io.connect(environment.ws);
    this.socket.on('connect', () => {
      // console.log(this.socket.id);
    });
    this.socket.on('entered', (e: User) => {
      this.currentUser.next(e);
    });

    this.socket.on('users:added', (e: User | User[]) => {
      console.log('users:added ', e);
      this.usersStore.next(this.usersStore.getValue().concat(e));
    });

    this.socket.on('users:changed', (e: User | User[]) => {
      if (!Array.isArray(e)) e = [e];
      this.usersStore.next(this.modelItemChanged(this.usersStore.getValue(), e) as User[]);
      let rooms = this.roomsStore.getValue();
      rooms.forEach(room => {
        if (!Array.isArray(e)) e = [e];
        room.users = this.modelItemChanged(room.users, e);
      });
      this.roomsStore.next(rooms);
      console.log('users:changed', e);
    });

    this.socket.on('users:removed', (e: User | User[]) => {
      if (!Array.isArray(e)) e = [e];
      this.usersStore.next(this.modelItemRemoved(this.usersStore.getValue(), e) as User[]);
      console.log('users:removed', e);
    });

    this.socket.on('rooms:added', (e: Room | Room[]) => {
      console.log('rooms:added', e);
      if (!Array.isArray(e)) e = [e];
      e.forEach(room => {
        if (room.owner === this.currentUser.getValue().id) this.router.navigate(['room', room.id]);
      })
      this.roomsStore.next(this.roomsStore.getValue().concat(e));
    });

    this.socket.on('rooms:changed', (e: Room | Room[]) => {
      if (!Array.isArray(e)) e = [e];
      this.roomsStore.next(this.modelItemChanged(this.roomsStore.getValue(), e) as Room[]);
      console.log('rooms:changed', e);
    });

    this.socket.on('rooms:removed', (e: Room | Room[]) => {
      if (!Array.isArray(e)) e = [e];
      this.roomsStore.next(this.modelItemRemoved(this.roomsStore.getValue(), e) as Room[]);
      console.log('rooms:removed', e);
    });

    this.socket.on('room:users:added', (e: User | User[], roomId: string) => {
      console.log('room:users:added', e);
      if (!Array.isArray(e)) e = [e];
      let rooms = this.roomsStore.getValue();
      const roomIndex = rooms.findIndex(room => room.id === roomId);
      if (!rooms[roomIndex].users) rooms[roomIndex].users = [];
      const ids = new Set(rooms[roomIndex].users.map(d => d.id));
      rooms[roomIndex].users = [...rooms[roomIndex].users, ...e.filter(d => !ids.has(d.id))];
      this.roomsStore.next(rooms);
    });

    this.socket.on('room:users:removed', (e: User | User[], roomId: string) => {
      console.log('room:users:removed', e);
      if (!Array.isArray(e)) e = [e];
      let rooms = this.roomsStore.getValue();
      const roomIndex = rooms.findIndex(room => room.id === roomId);
      rooms[roomIndex].users = this.modelItemRemoved(rooms[roomIndex].users, e);
      this.roomsStore.next(rooms);
    });

    this.socket.on('room:messages:added', (e: Message | Message[], roomId: string) => {
      console.log('room:messages:added', e);
      if (!Array.isArray(e)) e = [e];
      e.map(msg => msg.createdAt = new Date(msg.createdAt));
      let rooms = this.roomsStore.getValue();
      const roomIndex = rooms.findIndex(room => room.id === roomId);
      if (!rooms[roomIndex].messages) rooms[roomIndex].messages = [];
      const ids = new Set(rooms[roomIndex].messages.map(d => d.id));
      rooms[roomIndex].messages = [...rooms[roomIndex].messages, ...e.filter(d => !ids.has(d.id))];
      this.roomsStore.next(rooms);
    });
  }

  changeUserName(userName: string) {
    this.socket.emit('setName', userName);
  }

  createRoom(roomName: string) {
    this.socket.emit('createRoom', roomName, (response: any) => {
      console.log(response); // ok
    });
  }

  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', roomId);
  }

  leaveRoom(roomId: string) {
    this.socket.emit('leaveRoom', roomId);
  }

  sendMessage(roomId: string, msg: string) {
    this.socket.emit('sendMessage', roomId, msg);
  }

  modelItemChanged(modelStore: User[] | Room[], changedValues: User[] | Room[]) {
    changedValues.forEach(changedValue => {
      const valueIndex = modelStore.findIndex(value => value.id === changedValue.id);
      if (valueIndex !== -1) modelStore[valueIndex] = changedValue;
    });
    return modelStore;
  }

  modelItemRemoved(modelStore: User[] | Room[], removedValues: User[] | Room[]) {
    removedValues.forEach(removedValue => {
      const valueIndex = modelStore.findIndex(value => value.id === removedValue.id);
      if (valueIndex !== -1) modelStore.splice(valueIndex, 1);
    });
    return modelStore;
  }
}
