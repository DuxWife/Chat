import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { UsersListComponent } from './shared/users-list/users-list.component';
import { RoomPageComponent } from './components/room-page/room-page.component';
import { RoomsListComponent } from './shared/rooms-list/rooms-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from '@angular/material/divider';
import { SetNameDialogComponent } from './shared/set-name-dialog/set-name-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { HomePageComponent } from './components/home-page/home-page.component';
import { MessagesListComponent } from './shared/messages-list/messages-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    RoomPageComponent,
    RoomsListComponent,
    SetNameDialogComponent,
    HomePageComponent,
    MessagesListComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatIconModule,
      MatButtonModule,
      MatDividerModule,
      MatDialogModule,
      MatFormFieldModule,
      FormsModule,
      MatInputModule,
      ReactiveFormsModule,
      MatToolbarModule,
      MatCardModule,
      FlexLayoutModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
