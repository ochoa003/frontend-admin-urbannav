import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { ChartsComponent } from './pages/charts/charts.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    //children: []
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    //children: []
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
