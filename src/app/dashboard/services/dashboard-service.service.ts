import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private http = inject( HttpClient );

  private _informacionActual = signal<any|null>(null);

  //? Al mundo exterior!
  public currentInfo = computed( () => this._informacionActual() );

  constructor() { 
    console.log('DashboardService funcionando')
  }

  crearVariable( nombreVariable: string, valorVariable: string ) {
    return this.http.post('http://localhost:3001/variable', {
      nombreVariable,
      valorVariable
    })
  }

  crearCiudad( Nombre: string, Descripcion: string ) {
    return this.http.post('http://localhost:3000/ciudad', {
      Nombre,
      Descripcion
    })
  }

  obtenerCiudades() {
    return this.http.get('http://localhost:3000/ciudad')
  }

  obtenerBarrios() {
    return this.http.get('http://localhost:3000/barrio', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
  }

  crearRecorrido( DistanciaKM: number, barrioOrigenId: number, barrioDestinoId: number ) {
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

  crearBarrio( nombreBarrio: string, Descripcion: string, ciudadId: number ) {
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
}
