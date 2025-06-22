import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user.model';
import { TableComponent, TableColumnComponent } from '@shared/components/table/table.component';
import {
  PaginatorComponent,
  PageChangeEvent,
} from '@shared/components/paginator/paginator.component';
import { InputComponent } from '@shared/components/input/input.component';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TableColumnComponent,
    PaginatorComponent,
    ReactiveFormsModule,
    InputComponent,
    DatePickerComponent,
    ButtonComponent,
  ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  users = signal<User[]>([]);
  filterForm!: FormGroup;
  filters = signal<{search: string | null; dateFrom: string | null; dateTo: string | null;}>({search: '', dateFrom: null, dateTo: null});

  currentPage = signal(0);
  pageSize = signal(10);

  filteredUsers = computed(() => {
    const search = this.filters().search?.toLowerCase() || '';
    const dateFrom = this.filters().dateFrom;
    const dateTo = this.filters().dateTo;

    if (!search && !dateFrom && !dateTo) {
      return this.users();
    }

    return this.users().filter((user) => {
      const userName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const userEmail = user.email.toLowerCase();
      const userCountry = user.location.country.toLowerCase();
      const userDob = new Date(user.dob.date);

      const matchesSearch =
        userName.includes(search) ||
        userEmail.includes(search) ||
        userCountry.includes(search);

      const matchesDateFrom = dateFrom ? userDob >= new Date(dateFrom) : true;
      const matchesDateTo = dateTo ? userDob <= new Date(dateTo) : true;

      return matchesSearch && matchesDateFrom && matchesDateTo;
    });
  });

  displayedUsers = computed(() => {
    const start = this.currentPage() * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredUsers().slice(start, end);
  });

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      dateFrom: [null],
      dateTo: [null],
    });
    this.loadUsers();

    this.filterForm
      .get('search')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === '') {
          this.applyFilters();
        }
      });
  }

  applyFilters(): void {
    this.filters.set(this.filterForm.getRawValue());
    this.currentPage.set(0);
  }

  loadUsers(): void {
    this.userService.getUsers(200).subscribe((users) => {
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
