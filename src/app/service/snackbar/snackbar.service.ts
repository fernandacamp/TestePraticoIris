import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export interface SnackbarData {
  message: string;
  type: 'success' | 'error';
  duration?: number;
}


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbarSubject = new Subject<SnackbarData>;

  /**
   * Retorna um Observable que emite os dados do snackbar.
   * @returns Observable<SnackbarData>
   */
  getSnackbar() : Observable<SnackbarData> {
    return this.snackbarSubject.asObservable();
  }

  /**
   * Exibe um snackbar com uma mensagem, o tipo e duração personalizados.
   * @param message Mensagem a ser exibida pelo snackbar.
   * @param type Tipo de snackbar a ser exibido (sucesso ou erro).
   * @param duration Tempo em milissegundos que o snackbar ficará visível.
   */
  showSnackbar(data: SnackbarData) {
    this.snackbarSubject.next(data);
  }


}
