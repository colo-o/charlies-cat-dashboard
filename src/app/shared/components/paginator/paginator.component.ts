import { Component, computed, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorControlsComponent } from './paginator-controls/paginator-controls.component';

export interface PageChangeEvent {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorControlsComponent],
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  totalItems = input.required<number>();
  pageSize = input(10);
  pageSizeOptions = input([5, 10, 20, 50]);
  currentPage = input(0);

  pageChange = output<PageChangeEvent>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));
  isFirstPage = computed(() => this.currentPage() === 0);
  isLastPage = computed(() => this.currentPage() >= this.totalPages() - 1);

  pages = computed(() => {
    const pageCount = this.totalPages();
    return Array.from({ length: pageCount }, (_, i) => i);
  });

  goToPage(pageIndex: number): void {
    if (pageIndex >= 0 && pageIndex < this.totalPages()) {
      this.pageChange.emit({ pageIndex, pageSize: this.pageSize() });
    }
  }

  nextPage(): void {
    if (!this.isLastPage()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (!this.isFirstPage()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  changePageSize(newSize: string): void {
    this.pageChange.emit({ pageIndex: 0, pageSize: Number(newSize) });
  }
}
