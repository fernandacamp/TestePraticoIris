import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() buttonStyle: 'primary' | 'danger' | 'outline' | 'success' = 'primary';
  @Input() size: 'xsm' | 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() icon?: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';


}
