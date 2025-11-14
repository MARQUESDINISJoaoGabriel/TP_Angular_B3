import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
  <div class="container">
    <h2>Connexion</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="username" name="username" placeholder="Username" />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" />
      <button>Login</button>
      <p *ngIf="error" style="color: red;">Mauvais identifiants</p>
    </form>
  </div>
  
 
  `,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const ok = this.auth.login(this.username, this.password);
    if (ok) this.router.navigate(['/']);
    else this.error = true;
  }
}