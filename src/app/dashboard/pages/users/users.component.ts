import { Component, inject } from '@angular/core';
import { DashboardServiceService } from '../../services/dashboard-service.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {

  public usuarios: any[] = []
  public loading = false

  public dashboardService = inject( DashboardServiceService )
  public authService = inject( AuthService )

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

    //jusitificacion

    const idClienteRol = '65243b86591891311c031c97';
    const idConductorRol = '65243b9b591891311c031c98';
    let rol = ""

    if(rolId === idClienteRol) {
      rol = 'CLIENTE'
      Swal.fire({
        title: 'Justifica la inactivación del usuario',
        html:
          '<input id="swal-input2" class="swal2-input" placeholder="Escribe la justificación">',
        focusConfirm: false,
        confirmButtonText: 'Inactivar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        preConfirm: () => {
          return [
            (document.getElementById('swal-input2') as HTMLInputElement).value,
          ];
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes manejar los datos del formulario como desees

          const descripcion = result.value![0];
          console.log(descripcion)
          console.log(this.authService.currentUser()._id)

          //obtener info del admin
          this.dashboardService.obtenerAdminInfo(this.authService.currentUser()._id).subscribe({
            next: (data: any) => {
              const idAdministrador = data.usuarioEnLogica.idAdministrador
              
              //crear justificacion
              this.dashboardService.crearJustificacionCliente(descripcion, id, idAdministrador).subscribe({
                next: (data: any) => {
                  
                  this.dashboardService.inactivarUsuario(id, rol).subscribe({
                    next: (data: any) => {
                      console.log(data)
                      Swal.fire(
                        'Usuario inactivado',
                        'El usuario ha sido inactivado',
                        'success'
                      )
                      this.ngOnInit()
                    },
                    error: (error: any) => {
                      console.log(error)
                    }
                  })

                },
                error: (error: any) => {
                  console.log(error)
                }
              })
              
            },
            error: (error: any) => {
              console.log(error)
            }
          })
        }
      });

    } else if(rolId === idConductorRol) {
      rol = 'CONDUCTOR'

      Swal.fire({
        title: 'Justifica la inactivación del usuario',
        html:
          '<input id="swal-input2" class="swal2-input" placeholder="Escribe la justificación">',
        focusConfirm: false,
        confirmButtonText: 'Inactivar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        preConfirm: () => {
          return [
            (document.getElementById('swal-input2') as HTMLInputElement).value,
          ];
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes manejar los datos del formulario como desees

          const descripcion = result.value![0];
          console.log(descripcion)
          console.log(this.authService.currentUser()._id)

          //obtener info del admin
          this.dashboardService.obtenerAdminInfo(this.authService.currentUser()._id).subscribe({
            next: (data: any) => {
              const idAdministrador = data.usuarioEnLogica.idAdministrador
              
              //crear justificacion
              this.dashboardService.crearJustificacionCliente(descripcion, id, idAdministrador).subscribe({
                next: (data: any) => {
                  
                  this.dashboardService.inactivarUsuario(id, rol).subscribe({
                    next: (data: any) => {
                      console.log(data)
                      Swal.fire(
                        'Usuario inactivado',
                        'El usuario ha sido inactivado',
                        'success'
                      )
                      this.ngOnInit()
                    },
                    error: (error: any) => {
                      console.log(error)
                    }
                  })

                },
                error: (error: any) => {
                  console.log(error)
                }
              })
              
            },
            error: (error: any) => {
              console.log(error)
            }
          })
        }
      });
    }
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
