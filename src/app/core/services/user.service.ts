import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, UserResponse } from '../models/user.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private apiUrl: string;
  private usersSignal = signal<User[]>([]);
  private selectedUserSignal = signal<User | null>(null);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  public users = computed(() => this.usersSignal());
  public selectedUser = computed(() => this.selectedUserSignal());
  public loading = computed(() => this.loadingSignal());
  public error = computed(() => this.errorSignal());

  constructor() {
    this.apiUrl = this.configService.randomUserApiUrl;
  }

  getUsers(count = 10): Observable<User[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<UserResponse>(`${this.apiUrl}?results=${count}`).pipe(
      map((response) => response.results),
      tap((users) => {
        this.usersSignal.set(users);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.loadingSignal.set(false);
        this.errorSignal.set('Failed to load users. Please try again.');
        return throwError(() => error);
      }),
    );
  }

  selectUser(user: User): void {
    this.selectedUserSignal.set(user);
  }

  getUserById(uuid: string): User | undefined {
    return this.usersSignal().find((user) => user.login.uuid === uuid);
  }

  clearSelectedUser(): void {
    this.selectedUserSignal.set(null);
  }
}
