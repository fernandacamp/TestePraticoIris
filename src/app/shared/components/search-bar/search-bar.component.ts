import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() placeholder: string = 'Buscar usuário..';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disable: boolean = false;
  @Input() icon: string = 'assets/images/search_orange.svg';
  @Input() value: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();


  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }

   onEnter(event?: Event) {
    if (event) event.preventDefault();
    this.search.emit(this.value);
  }

}
