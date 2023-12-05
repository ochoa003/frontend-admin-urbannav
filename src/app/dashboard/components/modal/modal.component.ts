import { Component, Input, computed, inject, signal } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title"></h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <!-- Contenido del modal -->

      <h2 class="mb-2" *ngIf="this.dashboardService.opcionActual() === 'VER_CIUDADES'">Lista de Ciudades</h2>

      <h2 class="mb-2" *ngIf="this.dashboardService.opcionActual() === 'VER_VARIABLES'">Lista de Variables</h2>

      <h2 class="mb-2" *ngIf="this.dashboardService.opcionActual() === 'VER_BARRIOS'">Lista de Barrios</h2>

      <h2 class="mb-2" *ngIf="this.dashboardService.opcionActual() === 'VER_RECORRIDOS'">Lista de Recorridos</h2>

      <hr>

      <div *ngIf="loading" class="d-flex justify-content-center p-2">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando información...</span>
        </div>
      </div>

      <div *ngIf="this.dashboardService.opcionActual() === 'VER_CIUDADES'">
        <div class="alert alert-info" *ngFor="let ciudad of this.ciudades">{{ ciudad.Nombre }}</div>
      </div>

      <div *ngIf="this.dashboardService.opcionActual() === 'VER_VARIABLES'">
        <div class="alert alert-info" *ngFor="let variable of this.variables">{{ variable.nombreVariable }}: {{ variable.valorVariable }}</div>
      </div>

      <div *ngIf="this.dashboardService.opcionActual() === 'VER_BARRIOS'">
        <div class="alert alert-info" *ngFor="let barrio of this.barrios">{{ barrio.nombreBarrio }}: {{ barrio.ciudad.Nombre }}</div>
      </div>

      <div *ngIf="this.dashboardService.opcionActual() === 'VER_RECORRIDOS'">
        <div class="alert alert-info" *ngFor="let recorrido of this.recorridos">{{ recorrido.barrioOrigen.nombreBarrio }} - {{ recorrido.barrioDestino.nombreBarrio }} - {{ recorrido.DistanciaKM }} Kms de distancia</div>
      </div>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="cerrarModal()">Cerrar</button>
      <!-- Puedes agregar más botones según tus necesidades -->
    </div>
  `,
})
export class ModalComponent {

  @Input() accion: string = '';

  public loading = false;

  public dashboardService = inject( DashboardServiceService );
  public ciudades: any = signal<any[] | null>(null);
  public variables: any = signal<any[] | null>(null);
  public recorridos: any = signal<any[] | null>(null);
  public barrios: any = signal<any[] | null>(null);

  ngOnInit(): void {
    if(this.accion === 'VER_CIUDADES') {
      this.loading = true
      this.listarCiudades()
    }
    if(this.accion === 'VER_VARIABLES') {
      this.loading = true
      this.listarVariables()
    }
    if(this.accion === 'VER_BARRIOS') {
      this.loading = true
      this.listarBarrios()
    }
    if(this.accion === 'VER_RECORRIDOS') {
      this.loading = true
      this.listarRecorridos()
    }
  }

  constructor(public bsModalRef: BsModalRef) {
    console.log("Dashboard service!!!!!")
    console.log(this.dashboardService.opcionActual())
    // this.listarCiudades()
    // this.listarVariables()
    // this.listarBarrios()
    // this.listarRecorridos()
  }

  listarCiudades(): any {
    this.dashboardService.obtenerCiudades().subscribe({
      next: (data: any) => {
        this.ciudades = data;
        this.loading = false
      },
      error: (error: any) => {
        console.log(error)
        this.loading = false
      }
    })
  }

  listarVariables(): any {
    this.dashboardService.obtenerVariables().subscribe({
      next: (data: any) => {
        this.variables = data;
        this.loading = false
      },
      error: (error: any) => {
        console.log(error)
        this.loading = false
      }
    })
  }

  listarBarrios(): any {
    this.dashboardService.obtenerBarrios().subscribe({
      next: (data: any) => {
        console.log(data)
        this.barrios = data;
        this.loading = false
      },
      error: (error: any) => {
        console.log(error)
        this.loading = false
      }
    })
  }

  listarRecorridos(): any {
    this.dashboardService.obtenerRecorridos().subscribe({
      next: (data: any) => {
        console.log(data)
        this.recorridos = data;
        this.loading = false
      },
      error: (error: any) => {
        console.log(error)
        this.loading = false
      }
    })
  }

  cerrarModal() {
    this.bsModalRef.hide();
  }
}
