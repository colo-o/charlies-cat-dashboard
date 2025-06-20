import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-user-detail-form',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './user-detail-form.component.html',
})
export class UserDetailFormComponent {
  user = input.required<User>();
}
