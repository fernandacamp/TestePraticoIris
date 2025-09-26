import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule, NgClass } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() size: 'xsm' | 'sm' | 'md' | 'lg' = 'md';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;

  value: string = '';

  onChange: (value: any) => void = () => { };
  onTouched = () => { };

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value;
      this.onChange(input.value);
    }
  }

  handleBlur() {
    this.onTouched();
  }

}
