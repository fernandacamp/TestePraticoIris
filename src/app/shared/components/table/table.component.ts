import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UserService } from '../../../service/user/user.service';
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
  imports: [],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

}
