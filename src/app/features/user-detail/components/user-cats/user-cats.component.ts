import { Component, input } from '@angular/core';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-user-cats',
  standalone: true,
  templateUrl: './user-cats.component.html',
})
export class UserCatsComponent {
  user = input.required<User>();

  cats = [
    {
      name: 'Gibran & Juan',
      image:
        'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Felipe',
      image:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Sebastian',
      image:
        'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Juliana & Alejandra',
      image:
        'https://plus.unsplash.com/premium_photo-1707353402061-c31b6ba8562e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
}
