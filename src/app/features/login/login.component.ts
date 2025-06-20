import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ToggleComponent } from '../../shared/components/toggle/toggle.component';
import { AuthService } from '../../core/services/auth.service';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent, ToggleComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  logger = inject(LoggerService);
  showPassword = signal(false);
  loginError = signal(false);
  loading = signal(false);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.loginError.set(false);
    if (this.form.valid) {
      this.loading.set(true);
      const { username, password } = this.form.getRawValue();
      if (username && password) {
        this.authService.login(username, password).subscribe({
          next: (success: boolean) => {
            if (success) {
              const redirectUrl = this.authService.redirectUrl;
              if (redirectUrl) {
                this.router.navigateByUrl(redirectUrl);
                this.authService.redirectUrl = null;
              } else {
                this.router.navigate(['/']);
              }
            } else {
              this.loginError.set(true);
              this.logger.error('Login failed');
            }
          },
          complete: () => {
            this.loading.set(false);
          },
        });
      }
    }
  }
}
