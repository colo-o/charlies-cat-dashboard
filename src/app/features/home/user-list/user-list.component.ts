import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user.model';
import { TableComponent, TableColumnComponent } from '@shared/components/table/table.component';
import {
  PaginatorComponent,
  PageChangeEvent,
} from '@shared/components/paginator/paginator.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableComponent, TableColumnComponent, PaginatorComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);
  private router = inject(Router);

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
    this.userService.getUsers(100).subscribe((users) => {
      this.users.set(users);
    });
  }

  onPageChange(event: PageChangeEvent): void {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  viewUser(user: User): void {
    this.userService.selectUser(user);
    this.router.navigate(['/user', user.login.uuid]);
  }
}
