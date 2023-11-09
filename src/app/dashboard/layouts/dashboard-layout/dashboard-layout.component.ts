import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );
  private router = inject( Router );
  
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
