import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  TemplateRef,
  input,
  output,
  ChangeDetectionStrategy,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-column',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableColumnComponent<T> {
  key = input.required<keyof T | string>();
  header = input.required<string>();
  sortable = input(false);

  @ContentChild(TemplateRef) templateRef: TemplateRef<unknown> | null = null;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements AfterContentInit {
  data = input.required<readonly T[]>();
  rowClick = output<T>();

  @ContentChildren(TableColumnComponent)
  columns!: QueryList<TableColumnComponent<T>>;

  columnDefs: TableColumnComponent<T>[] = [];

  ngAfterContentInit() {
    this.columnDefs = this.columns.toArray();
  }

  onRowClick(row: T) {
    this.rowClick.emit(row);
  }
}
