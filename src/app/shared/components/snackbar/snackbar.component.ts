import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SnackbarData, SnackbarService } from '../../../service/snackbar/snackbar.service';


type SnackbarType = 'success' | 'error';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})

export class SnackbarComponent implements OnInit {

  message: string = '';
  type: 'success' | 'error' = 'success';
  visible: boolean = false;
  duration: number = 3000; // duração em milissegundos

  /**
   * Injeta o serviço de snackbar no componente.
   * @param snackbarService Serviço responsável por emitir os eventos de snackbar.
   */
  constructor(private snackbarService: SnackbarService) { }

  // Inicializa o componente e se inscreve no SnackbarService
  ngOnInit() {
    this.snackbarService.getSnackbar().subscribe((data: SnackbarData) => {
      this.message = data.message;
      this.type = data.type;
      this.duration = data.duration ?? 3000;
      this.showSnackbar();
    });

  }

  // Controla a visibilidade do snackbar e oculta ele após o tempo definido em 'duration'
  private showSnackbar() {
    this.visible = true;
    setTimeout(() => this.visible = false, this.duration);
  }


}
