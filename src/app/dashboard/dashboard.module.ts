import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsersComponent } from './pages/users/users.component';
import { AuthModule } from '../auth/auth.module';
import { RecaptchaModule } from "ng-recaptcha";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ModalComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AuthModule,
    RecaptchaModule,
  ]
})
export class DashboardModule { }
