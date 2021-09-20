import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Room, User} from "../../models";
import {SetNameDialogComponent} from "../set-name-dialog/set-name-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RoomsListComponent implements OnInit {
  @Input() currentUser: User = {} as User;
  @Input() rooms: Room[] = [];
  @Output() createRoomEvent = new EventEmitter<string>();

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  createRoom() {
    const dialogRef = this.dialog.open(SetNameDialogComponent, {
      data: {header: 'Введите название комнаты'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.createRoomEvent.emit(result);
    });
  }
}
