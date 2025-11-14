// src/app/auth/auth.service.ts
// AuthService (gestion login/logout)

// Simule une API qui renvoie un token JWT


import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  isLoggedIn = signal<boolean>(this.hasToken());

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      const token = 'fake-jwt-token-123456';
      localStorage.setItem(this.tokenKey, token);
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  hasToken() {
    return !!localStorage.getItem(this.tokenKey);
  }
}