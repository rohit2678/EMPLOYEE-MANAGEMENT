import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskService } from './task.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

const router: Routes = [
  { path: "add", component: AddEmployeeComponent },
  { path: "view", component: ShowDetailsComponent },
  { path: "", component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    ShowDetailsComponent,
    MenuComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
