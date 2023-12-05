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
    const usuariosValidos: any[] = []
    this.usuarios.forEach((usuario: any) => {
      if(usuario.usuarioLogica) {
        usuariosValidos.push(usuario)
      }
    })
    return usuariosValidos;
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

  inactivarUsuario(id: number, rolId : string) {
    const idClienteRol = '65243b86591891311c031c97';
    const idConductorRol = '65243b9b591891311c031c98';
    let rol = ""
    if(rolId === idClienteRol) {
      rol = 'CLIENTE'
    } else if(rolId === idConductorRol) {
      rol = 'CONDUCTOR'
    }
    this.dashboardService.inactivarUsuario(id, rol).subscribe({
      next: (data: any) => {
        console.log(data)
        this.ngOnInit()
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  activarUsuario(id: number, rolId : string) {
    const idClienteRol = '65243b86591891311c031c97';
    const idConductorRol = '65243b9b591891311c031c98';
    let rol = ""
    if(rolId === idClienteRol) {
      rol = 'CLIENTE'
    } else if(rolId === idConductorRol) {
      rol = 'CONDUCTOR'
    }
    this.dashboardService.activarUsuario(id, rol).subscribe({
      next: (data: any) => {
        console.log(data)
        this.ngOnInit()
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }


}
