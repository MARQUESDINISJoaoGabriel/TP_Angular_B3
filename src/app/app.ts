
import { Component, signal,inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { SplashComponent } from './splash/splash.component';
import { AppSpinnerComponent } from './shared/app-spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('pokedex-b3');

  constructor(private auth : AuthService, private router: Router){
  }
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
