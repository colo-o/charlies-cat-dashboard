import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
})
export class ToggleComponent {
  label = input<string>('');
  checked = model<boolean>(false);

  toggle(): void {
    this.checked.update(value => !value);
  }
}
