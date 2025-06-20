import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  currentPage = 0;
  pageSize = 10;

  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // implementation to follow in a subsequent subtask
  }
}
