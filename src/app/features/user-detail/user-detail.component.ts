import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UserDetailHeaderComponent } from './components/user-detail-header/user-detail-header.component';
import { UserDetailFormComponent } from './components/user-detail-form/user-detail-form.component';
import { UserCatsComponent } from './components/user-cats/user-cats.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    UserDetailHeaderComponent,
    UserDetailFormComponent,
    UserCatsComponent,
  ],
  templateUrl: './user-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user = this.userService.selectedUser;
  loading = this.userService.loading;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      if (!this.user() || this.user()?.login.uuid !== userId) {
        const foundUser = this.userService.getUserById(userId);
        if (foundUser) {
          this.userService.selectUser(foundUser);
        } else {
          console.error('User not found in the local list.');
          this.router.navigate(['/']);
        }
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
