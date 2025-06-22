import { Component, inject, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor {
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');

  public ngControl = inject(NgControl, { self: true, optional: true });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(): void {
    // Method required by ControlValueAccessor.
  }

  registerOnChange(): void {
    // Method required by ControlValueAccessor.
  }

  registerOnTouched(): void {
    // Method required by ControlValueAccessor.
  }

  get control(): FormControl {
    return (this.ngControl?.control as FormControl) ?? new FormControl();
  }

  clear(): void {
    this.control.setValue('');
  }
}
