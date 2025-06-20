import { Component, input } from '@angular/core';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-user-cats',
  standalone: true,
  templateUrl: './user-cats.component.html',
})
export class UserCatsComponent {
  user = input.required<User>();
}
