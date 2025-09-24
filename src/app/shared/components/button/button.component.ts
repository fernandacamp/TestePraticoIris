import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() style: 'primary' | 'secondary' | 'denger' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disable = false;
  @Input() type: 'button' | ' submit' | 'reset' = 'button';

}
