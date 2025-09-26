import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent {

  @Input() title: string = 'Confirmar';
  @Input() message: string = 'Tem certeza?';
  @Input() visible: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.visible = false;
  }

  onCancel() {
    this.cancel.emit();
    this.visible = false;
  }

}
