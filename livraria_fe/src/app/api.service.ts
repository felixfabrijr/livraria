// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para autenticação
  authenticate(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/authenticate`, body);
  }

  // Método para obter a lista de livros
  getBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books`);
  }

  // Método para obter detalhes de um livro por ID
  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/${id}`);
  }

  // Outros métodos para adição, atualização, remoção, etc. podem ser adicionados aqui
  // Exemplo:
   addBook(bookData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, bookData);
   }

  updateBook(bookId: string, updatedData: any): Observable<any> {
     return this.http.put(`${this.baseUrl}/books/${bookId}`, updatedData);
   }

   deleteBook(bookId: string): Observable<any> {
     return this.http.delete(`${this.baseUrl}/books/${bookId}`);
   }
}

