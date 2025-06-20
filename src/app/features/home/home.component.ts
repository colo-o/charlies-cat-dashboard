import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user.model';
import { TableComponent, TableColumnComponent } from '@shared/components/table/table.component';
import {
  PaginatorComponent,
  PageChangeEvent,
} from '@shared/components/paginator/paginator.component';
import { computed, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TableComponent,
    TableColumnComponent,
    PaginatorComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  userService = inject(UserService);
  currentUser = this.authService.currentUser;

  users = signal<User[]>([]);

  currentPage = signal(0);
  pageSize = signal(10);

  displayedUsers = computed(() => {
    const start = this.currentPage() * this.pageSize();
    const end = start + this.pageSize();
    return this.users().slice(start, end);
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(50).subscribe((users) => {
      this.users.set(users);
    });
  }

  onPageChange(event: PageChangeEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
