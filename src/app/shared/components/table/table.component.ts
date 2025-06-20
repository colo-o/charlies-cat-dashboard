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
export class TableColumnComponent {
  key = input.required<string>();
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
export class TableComponent implements AfterContentInit {
  data = input.required<readonly unknown[]>();
  rowClick = output<unknown>();

  @ContentChildren(TableColumnComponent)
  columns!: QueryList<TableColumnComponent>;

  columnDefs: TableColumnComponent[] = [];

  ngAfterContentInit() {
    this.columnDefs = this.columns.toArray();
  }

  onRowClick(row: unknown) {
    this.rowClick.emit(row);
  }
}
