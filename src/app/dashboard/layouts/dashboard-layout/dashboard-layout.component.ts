import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardServiceService } from '../../services/dashboard-service.service';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  bsModalRef!: BsModalRef;

  private modalService = inject( BsModalService );

  abrirModal() {
    this.bsModalRef = this.modalService.show(ModalComponent);
  }

  private authService = inject( AuthService );
  private dashboardService = inject( DashboardServiceService );
  private router = inject( Router );

  public ciudades: any = signal<object | null>(null);
  public barrios: any = signal<object | null>(null);

  private fb = inject( FormBuilder );

  public myFormCiudad: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required]],
    Descripcion: ['', []],
    ciudadId: ['', []]
  });

  public myFormVariable: FormGroup = this.fb.group({
    nombreVariable: ['', [Validators.required]],
    valorVariable: ['', [Validators.required, Validators.minLength(1)]]
  });

  public myFormBarrio: FormGroup = this.fb.group({
    NombreBarrio: ['', [Validators.required]],
    Descripcion: ['', []],
    ciudadId: ['default', [Validators.required]]
  });

  public myFormRecorrido: FormGroup = this.fb.group({
    DistanciaKM: [0, [Validators.required] ],
    barrioOrigenId: ['default', [Validators.required,]],
    barrioDestinoId: ['default', [Validators.required,]],
  });
  
  public user = computed( () => this.authService.currentUser() );

  constructor() {
    this.obtenerCiudades()
    this.obtenerBarrios()
  }

  onLogout() {
    const logoutOk = this.authService.logout();
    console.log(logoutOk)
    if ( !logoutOk ) {
      this.router.navigateByUrl('/auth/login');
    }
  }

  onSubmitVariable() {
    const nombreVariable = this.myFormVariable.get('nombreVariable')?.value;
    const valorVariable = this.myFormVariable.get('valorVariable')?.value;

    console.log(nombreVariable, valorVariable)

    this.dashboardService.crearVariable( nombreVariable, valorVariable )
      .subscribe({
        next: (response) => {
          console.log('variable creada', response)
          this.myFormVariable.reset({
            nombreVariable: '',
            valorVariable: ''
          })
          Swal.fire({
            icon: 'success',
            title: 'Variable creada!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  onSubmitCiudad() {
    const Nombre = this.myFormCiudad.get('Nombre')?.value;
    const Descripcion = this.myFormCiudad.get('Descripcion')?.value;

    console.log(Nombre, Descripcion)

    this.dashboardService.crearCiudad( Nombre, Descripcion )
      .subscribe({
        next: (response) => {
          console.log('ciudad creada', response)
          Swal.fire({
            icon: 'success',
            title: 'Ciudad creada!',
            showConfirmButton: false,
            timer: 1500
          })
          this.myFormCiudad.reset()
          this.obtenerCiudades()
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  obtenerBarrios() {
    this.dashboardService.obtenerBarrios()
      .subscribe({
        next: (data) => {
          this.barrios = signal<any|null>(data);
          console.log(data)
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  obtenerCiudades() {
    this.dashboardService.obtenerCiudades()
      .subscribe({
        next: (data) => {
          this.ciudades = signal<any|null>(data);
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  onSubmitBarrio() {
    const NombreBarrio = this.myFormBarrio.get('NombreBarrio')?.value;
    const Descripcion = this.myFormBarrio.get('Descripcion')?.value;
    const ciudadId = this.myFormBarrio.get('ciudadId')?.value;

    if(ciudadId !== 'default') {
      console.log(NombreBarrio, Descripcion, ciudadId)
       this.dashboardService.crearBarrio( NombreBarrio, Descripcion, Number(ciudadId) )
      .subscribe({
        next: (response) => {
          console.log('barrio creado', response)
          Swal.fire({
            icon: 'success',
            title: 'Barrio creado!',
            showConfirmButton: false,
            timer: 1500
          })
          this.myFormBarrio.reset({
            ciudadId: 'default',
            NombreBarrio: '',
            Descripcion: ''
          })
          this.obtenerBarrios()
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  onSubmitRecorrido() {

    const DistanciaKM = this.myFormRecorrido.get('DistanciaKM')?.value;
    const barrioOrigenId = this.myFormRecorrido.get('barrioOrigenId')?.value;
    const barrioDestinoId = this.myFormRecorrido.get('barrioDestinoId')?.value;

    if(barrioOrigenId !== 'default' && barrioDestinoId !== 'default') {
      console.log(DistanciaKM, barrioOrigenId, barrioDestinoId)

      this.dashboardService.crearRecorrido( DistanciaKM, Number(barrioOrigenId), Number(barrioDestinoId) )
      .subscribe({
        next: (response) => {
          console.log('recorrido creado', response)
          Swal.fire({
            icon: 'success',
            title: 'Recorrido creado!',
            showConfirmButton: false,
            timer: 1500
          })
          this.myFormRecorrido.reset({
            DistanciaKM: 0,
            barrioOrigenId: 'default',
            barrioDestinoId: 'default',
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    }


  }

  // get user() {
  //   return this.authService.currentUser();
  // }

}
