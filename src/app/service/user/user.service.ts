import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/usuarios';

  /**
   * Injeta o HttpClient para realizar requisições HTTP.
   * @param http módulo HTTP do angular.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a lista de usuários.
   * @returns Observable contendo um array de usuários.
   */
  getUsers(page: number = 1, search: string = ''): Observable<HttpResponse<User[]>> {
    let params = new HttpParams()
      .set('_page', page);

      if (search && search.trim() !== '') {
        params = params.set('name', search.trim());
      }
    return this.http.get<User[]>(this.baseUrl, { params, observe: 'response' });
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  /**
   * Adiciona um novo usuário ao Json Server.
   * @param user Objeto de usuário sem o campo de id.
   * @returns Observable contendo o usuário adicionado com o id gerado.
   */
  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  /**
   * Atualiza um usuário já existente.
   * @param user Objeto de usuário com id.
   * @returns Observable contendo o usuário atualizado.
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

  /**
   * Exclui um usuário.
   * @param id Identificação do usuário a ser excluído.
   * @returns Observable void que indica que a operação foi concluída sem retorno de body.
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }



}
