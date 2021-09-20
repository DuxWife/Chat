import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {RoomPageComponent} from "./components/room-page/room-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'room/:id', component: RoomPageComponent },
  { path: ':', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
