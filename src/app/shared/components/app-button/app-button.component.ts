import { Component, Input } from '@angular/core';
import { NgClass } from "../../../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss'
})
export class AppButtonComponent {

  @Input() style: 'primary' | 'secondary' | 'denger' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disable = false;
  @Input() type: 'button' | ' submit' | 'reset' = 'button';

}
