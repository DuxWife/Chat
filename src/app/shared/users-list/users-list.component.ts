import {Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import {User} from "../../models";
import {MatDialog} from "@angular/material/dialog";
import {SetNameDialogComponent} from "../set-name-dialog/set-name-dialog.component";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsersListComponent implements OnInit {
  @Input() currentUser: User = {} as User;
  @Input() users: User[] = [];
  @Output() changeNameEvent = new EventEmitter<string>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  changeName() {
    const dialogRef = this.dialog.open(SetNameDialogComponent, {
      data: {header: 'Введите имя'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.changeNameEvent.emit(result);
    });
  }

}
