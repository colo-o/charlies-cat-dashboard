import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  authService = inject(AuthService);
  router = inject(Router);

  navItems = [
    {
      label: 'Home',
      icon: 'home',
      route: '/home',
    },
    {
      label: 'Cats',
      icon: 'pets',
      route: '/cats',
    },
    {
      label: 'Friends',
      icon: 'people',
      route: '/friends',
    },
    {
      label: 'Messages',
      icon: 'messages',
      route: '/messages',
    },
    {
      label: 'Notifications',
      icon: 'notifications',
      route: '/notifications',
    },
  ];

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
