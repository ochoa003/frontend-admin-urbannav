import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

// const opciones = {
//   verVariables: 'VER_VARIABLES',
//   verCiudades: 'VER_CIUDADES',
//   verBarrios: 'VER_BARRIOS',
//   verRecorridos: 'VER_RECORRIDOS',
// }

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private http = inject(HttpClient);

  private _informacionActual = signal<any | null>(null);
  public opcionActual = signal<string | null>(null);

  //? Al mundo exterior!
  public currentInfo = computed(() => this._informacionActual());
  // public currentOption = computed( () => this._opcionActual() );

  constructor() {
    console.log('DashboardService funcionando')
  }

  obtenerUsuarios() {
    return this.http.get('http://localhost:3001/usuario', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  cambiarOpcionVisualizacion(opcion: string) {
    this.opcionActual = signal<string | null>(opcion);
  }

  crearVariable(nombreVariable: string, valorVariable: string) {
    return this.http.post('http://localhost:3001/variable', {
      nombreVariable,
      valorVariable
    })
  }

  crearCiudad(Nombre: string, Descripcion: string) {
    return this.http.post('http://localhost:3000/ciudad', {
      Nombre,
      Descripcion
    })
  }

  obtenerCiudades() {
    return this.http.get('http://localhost:3000/ciudad')
  }

  obtenerVariables() {
    return this.http.get('http://localhost:3001/variable', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  obtenerBarrios() {
    return this.http.get('http://localhost:3000/barrio?filter={"include":[{"relation":"ciudad"}]}', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  obtenerRecorridos() {
    return this.http.get('http://localhost:3000/recorrido?filter={"include":[{"relation":"barrioOrigen"},{"relation":"barrioDestino"}]}')
  }

  crearRecorrido(DistanciaKM: number, barrioOrigenId: number, barrioDestinoId: number) {
    return this.http.post('http://localhost:3000/recorrido', {
      DistanciaKM,
      barrioOrigenId,
      barrioDestinoId
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

  }

  crearBarrio(nombreBarrio: string, Descripcion: string, ciudadId: number) {
    return this.http.post('http://localhost:3000/barrio', {
      nombreBarrio,
      Descripcion,
      ciudadId
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

  }

  inactivarUsuario(id: number, rol: string) {
    if (rol === 'CLIENTE') {
      return this.http.patch(`http://localhost:3000/cliente/${id}`, {
        estado: "INACTIVO"
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    if (rol === 'CONDUCTOR') {
      return this.http.patch(`http://localhost:3000/counductor/${id}`, {
        estado: "INACTIVO"
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    return new Observable<boolean>(observer => {
      observer.next(false); // Emite el valor false
      observer.complete();   // Completa el observable
    });
  }

  activarUsuario(id: number, rol: string) {
    if (rol === 'CLIENTE') {
      return this.http.patch(`http://localhost:3000/cliente/${id}`, {
        estado: "ACTIVO"
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    if (rol === 'CONDUCTOR') {
      return this.http.patch(`http://localhost:3000/counductor/${id}`, {
        estado: "ACTIVO"
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    return new Observable<boolean>(observer => {
      observer.next(false); // Emite el valor false
      observer.complete();   // Completa el observable
    });
  }
}
