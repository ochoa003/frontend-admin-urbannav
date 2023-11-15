import { Component, inject } from '@angular/core';
import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {

  public usuarios: any[] = []
  public loading = false

  public dashboardService = inject( DashboardServiceService )

  public usuariosArray() {
    return this.usuarios;
  }

  ngOnInit(): void {
    this.loading = true
    this.dashboardService.obtenerUsuarios().subscribe({
      next: (data: any) => {
        console.log(data)
        this.usuarios = data
        this.loading = false
      },
      error: (error: any) => {
        console.log(error)
      }
    })
    
  }

}
