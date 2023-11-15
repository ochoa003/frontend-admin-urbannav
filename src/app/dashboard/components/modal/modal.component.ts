import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Mi Modal</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <!-- Contenido del modal -->
      <p>Este es el contenido de mi modal.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="cerrarModal()">Cerrar</button>
      <!-- Puedes agregar más botones según tus necesidades -->
    </div>
  `,
})
export class ModalComponent {
  constructor(public bsModalRef: BsModalRef) {}

  cerrarModal() {
    this.bsModalRef.hide();
  }
}
