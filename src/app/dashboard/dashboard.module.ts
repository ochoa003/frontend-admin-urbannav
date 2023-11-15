import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsersComponent } from './pages/users/users.component';

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
    ModalModule.forRoot()
  ]
})
export class DashboardModule { }
