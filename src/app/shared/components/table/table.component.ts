import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../service/user/user.service';
import { ButtonComponent } from "../button/button.component";
import { ɵEmptyOutletComponent } from "@angular/router";

export interface TableColumn {
  field: string;
  header: string;
  isActions?: boolean;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ButtonComponent, ɵEmptyOutletComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() data: any[] = [];
  @Input() pageSize: number = 10;
  @Input() columns: TableColumn[] = [];
  @Input() currentPage: number = 1;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() currentPageChange = new EventEmitter<number>();

 
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  Math = Math;

  get totalPages(): number {
    return this.Math.ceil(this.data.length / this.pageSize);
  }

  pageData(): any[] {

    let copyArray = this.data.slice(); // retorna uma cópia do array completo
    if (this.sortField) {
      copyArray.sort((a, b) => {
        const aVal = a[this.sortField!];
        const bVal = b[this.sortField!];
        return (aVal < bVal ? 1 : -1) * (this.sortDirection === 'asc' ? 1 : -1);
      });
    }

    const start = (this.currentPage - 1) * this.pageSize;
    return copyArray.slice(start, start + this.pageSize);

  }

  sort(column: TableColumn) {
    if (column.isActions) return;
    if (this.sortField === column.field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = column.field;
      this.sortDirection = 'asc';
    }
  }

  goToPage(page: number) {
    if (page < 1 || page > Math.ceil(this.data.length / this.pageSize)) return;
    this.currentPage = page;
  }


  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }


}
