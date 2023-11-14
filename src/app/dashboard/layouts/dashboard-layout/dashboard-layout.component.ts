import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );
  private router = inject( Router );
  
  private fb = inject( FormBuilder );

  public myFormCiudad: FormGroup = this.fb.group({
    correo: ['danieldiazc413@gmail.com', [Validators.required, Validators.email]],
    clave: ['yR8u5MR1pX', [Validators.required, Validators.minLength(6)]]
  });

  public myFormVariable: FormGroup = this.fb.group({
    nombreVariable: ['', [Validators.required]],
    valorVariable: ['', [Validators.required, Validators.minLength(1)]]
  });

  public myFormBarrio: FormGroup = this.fb.group({
    correo: ['danieldiazc413@gmail.com', [Validators.required, Validators.email]],
    clave: ['yR8u5MR1pX', [Validators.required, Validators.minLength(6)]]
  });

  public myFormcorrido: FormGroup = this.fb.group({
    correo: ['danieldiazc413@gmail.com', [Validators.required, Validators.email]],
    clave: ['yR8u5MR1pX', [Validators.required, Validators.minLength(6)]]
  });
  
  public user = computed( () => this.authService.currentUser() );

  onLogout() {
    const logoutOk = this.authService.logout();
    console.log(logoutOk)
    if ( !logoutOk ) {
      this.router.navigateByUrl('/auth/login');
    }
  }

  // get user() {
  //   return this.authService.currentUser();
  // }

}
