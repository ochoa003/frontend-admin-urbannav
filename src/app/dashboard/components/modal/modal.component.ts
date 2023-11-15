import { Component, computed, inject, signal } from '@angular/core';
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
      <h2 *ngIf="this.dashboardService.opcionActual() === 'VER_CIUDADES'">Lista de Ciudades</h2>
      <div *ngIf="this.dashboardService.opcionActual() === 'VER_CIUDADES'">
        <div class="alert alert-info" *ngFor="let ciudad of this.ciudades">{{ ciudad.Nombre }}</div>
        <pre>
          <!-- {{ ciudades | json }} -->
        </pre>
      </div>

      <h2 *ngIf="this.dashboardService.opcionActual() === 'VER_VARIABLES'">Lista de Variables</h2>
      <h2 *ngIf="this.dashboardService.opcionActual() === 'VER_BARRIOS'">Lista de Barrios</h2>
      <h2 *ngIf="this.dashboardService.opcionActual() === 'VER_RECORRIDOS'">Lista de Recorridos</h2>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="cerrarModal()">Cerrar</button>
      <!-- Puedes agregar más botones según tus necesidades -->
    </div>
  `,
})
export class ModalComponent {
  
  public dashboardService = inject( DashboardServiceService );
  public ciudades: any = signal<any[] | null>(null);

  public ciudadesm = computed( () => this.dashboardService.obtenerCiudades() );
  
  constructor(public bsModalRef: BsModalRef) {
    console.log("Dashboard service!!!!!")
    console.log(this.dashboardService.opcionActual())
    this.listarCiudades()
  }

  listarCiudades(): any {
    this.dashboardService.obtenerCiudades().subscribe({
      next: (data: any) => {
        this.ciudades = data;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  cerrarModal() {
    this.bsModalRef.hide();
  }
}
