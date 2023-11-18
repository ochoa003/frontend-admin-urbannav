import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces/auth-status.enum';
import Swal from 'sweetalert2';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );

  if( authService.authStatus() === AuthStatus.authenticated ) {
    Swal.fire('Hola de nuevo!', 'Autenticado correctamente', 'success');
    return true;
  }

  // const url = state.url;
  // localStorage.setItem('url', url);

  const router = inject( Router );
  router.navigateByUrl('/auth/login');
  return false;

};


