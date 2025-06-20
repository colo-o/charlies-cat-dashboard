import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorControlsComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pages = input.required<number[]>();
  isFirstPage = input.required<boolean>();
  isLastPage = input.required<boolean>();

  pageSelected = output<number>();
  next = output<void>();
  previous = output<void>();
  first = output<void>();
  last = output<void>();

  onGoToPage(page: number): void {
    this.pageSelected.emit(page);
  }
}
