import { Injectable, computed, signal, inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthUser } from '../models/user.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string | null = null;
  private authUsers = [
    { username: 'user123', password: 'Password1!' },
    { username: 'coder_gal', password: 'SecurePass2#' },
    { username: 'dev_master', password: 'MySecretPwd3$' },
    { username: 'test_account', password: 'WeakPassword4%' },
    { username: 'admin_user', password: 'AdminPass5^' },
  ];

  private isAuthenticatedSignal = signal<boolean>(false);
  public isAuthenticated = computed(() => this.isAuthenticatedSignal());
  private currentUserSignal = signal<AuthUser | null>(null);
  public currentUser = computed(() => this.currentUserSignal());
  private logger = inject(LoggerService);

  constructor() {
    this.checkInitialSession();
  }

  private checkInitialSession() {
    if (typeof localStorage !== 'undefined') {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
          const user: AuthUser = JSON.parse(userJson);
          this.currentUserSignal.set(user);
          this.isAuthenticatedSignal.set(true);
        } catch (e) {
          this.logger.error('Error parsing user from localStorage', e);
          localStorage.removeItem('currentUser');
        }
      }
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const foundUser = this.authUsers.find(
      (u) => u.username === username && u.password === password,
    );

    return of(!!foundUser).pipe(
      delay(500),
      tap((isValid) => {
        this.isAuthenticatedSignal.set(isValid);
        if (isValid && foundUser) {
          const userToStore: AuthUser = { username: foundUser.username };
          this.currentUserSignal.set(userToStore);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(userToStore));
          }
        } else {
          this.currentUserSignal.set(null);
        }
      }),
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.isAuthenticatedSignal.set(false);
    this.currentUserSignal.set(null);
  }
}
