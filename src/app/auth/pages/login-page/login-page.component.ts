import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MD5 } from "crypto-js"

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public estaEn2FA = false;
  public usuarioId = ''

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    correo: ['danieldiazc413@gmail.com', [Validators.required, Validators.email]],
    clave: ['yR8u5MR1pX', [Validators.required, Validators.minLength(6)]]
  });

  public myForm2fa: FormGroup = this.fb.group({
    codigo2fa: ['', [Validators.required, Validators.minLength(6)]]
  });

  login() {
    const correo = this.myForm.get('correo')?.value;
    const claveNormal = this.myForm.get('clave')?.value;
    
    const clave = this.cifrar(claveNormal);

    console.log(correo, clave)
    this.authService.login( correo, clave )
      .subscribe({
        next: (user: any) => {
          this.usuarioId = user._id;
          console.log(this.usuarioId)
          if(!this.usuarioId) {
            Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
          } else {
            this.estaEn2FA = true;
          }
        },
        error: (err) => {
          Swal.fire('Error', err, 'error');
        }
      })
  }

  verificar2FA() {

    const codigo2fa = this.myForm2fa.get('codigo2fa')?.value;

    this.authService.verificar2FA( this.usuarioId, codigo2fa )
      .subscribe({
        next: (data) => {
          console.log("autenticar", data)
          // this.authService.setAuthentication( this.usuarioId );
        },
        error: (err) => {
          Swal.fire('Error', err, 'error');
        }
      })

  }

  cifrar(cadena: string): string {
    const cadenaCifrada = MD5(cadena).toString();
    return cadenaCifrada;
  }


}
