import { Component, input } from '@angular/core';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-user-detail-header',
  standalone: true,
  templateUrl: './user-detail-header.component.html',
})
export class UserDetailHeaderComponent {
  user = input.required<User>();
}
