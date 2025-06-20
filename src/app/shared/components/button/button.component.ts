import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  type = input<'submit' | 'button'>('button');
  disabled = input<boolean>(false);
  variant = input<'primary' | 'secondary' | 'bgless'>('primary');

  buttonClass = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return 'font-primary font-bold w-full px-4 py-3 uppercase text-white bg-brand-primary rounded-xl hover:cursor-pointer hover:bg-brand-soft-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light disabled:bg-gray-400 disabled:cursor-not-allowed';
      case 'secondary':
        return 'bg-brand-primary-light text-brand-primary font-primary px-6 py-3 rounded-lg hover:bg-blue-200 transition-colors disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed';
      case 'bgless':
        return 'text-gray-600 hover:text-gray-800 font-semibold disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed';
    }
  });
}
