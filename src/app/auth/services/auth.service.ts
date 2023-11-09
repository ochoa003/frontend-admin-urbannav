import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { CheckTokenResponse } from '../interfaces/check-token.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<any|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //? Al mundo exterior!
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication( user: any, token: string ): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    return true;
  }

  login( correo: string, clave: string ): Observable<boolean> {
    
      //? 1. Crear el objeto que se enviará al backend
      const data = { correo, clave };
    
      //? 2. Crear la petición HTTP
      const url = `http://localhost:3001/identificar-usuario`;
      return this.http.post<any>( url, data )
        .pipe(
          map( resp => {
            console.log(resp)
            return resp
            // return this.setAuthentication( resp.usuario, resp.token );
          }),
          catchError( err => {
            return of(false);
          })
        )
  }

  verificar2FA( usuarioId: string, codigo2fa: string ): Observable<boolean> {

    const data = { usuarioId, codigo2fa };

    const url = `http://localhost:3001/verificar-2fa`;
    return this.http.post<any>( url, data )
      .pipe(
        map( resp => {
          console.log(resp)
          const token = resp.token;
          const usuario = resp.user;
          const usuarioLogica = resp.usuaroLogica
          this._authStatus.set( AuthStatus.authenticated );
          this._currentUser.set( {
              correo: usuario.correo,
              _id: usuario._id,
          } );
          console.log("autenticado", this._authStatus())
          console.log('usuario actual', this._currentUser())
          localStorage.setItem('token', token);
          return true;
        }),
        catchError( err => {
          return of(false);
        })
      )
  }

  checkAuthStatus() {
    console.log(localStorage.getItem('token'))
    return this.http.post<any>( 'http://localhost:3001/usuario/verificar-token', {
      token: localStorage.getItem('token') || ''
    } )
      .pipe(
        map( resp => {
          if(resp.name) {
            this._currentUser.set({
              correo: resp.email,
              _id: resp.idMongoDB,
            });
            return this._authStatus.set( AuthStatus.authenticated );
          }
        }),
        catchError( err => {
          this._currentUser.set( null );
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false);
        })
      )
  }

  logout(): null {
    localStorage.removeItem('token');
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
    return null;
  }

}
