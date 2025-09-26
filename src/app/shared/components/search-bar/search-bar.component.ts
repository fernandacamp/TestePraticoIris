import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() placeholder: string = 'Buscar usuário..';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disable: boolean = false;
  @Input() icon: string = 'assets/images/search_orange.svg';

  //@Output() search = new EventEmitter<string>();


}
