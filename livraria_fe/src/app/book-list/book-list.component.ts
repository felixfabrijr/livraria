// book-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = []; // Adicione a inicialização

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadBooks();
  }

  

  loadBooks() {
    this.apiService.getBooks().subscribe(
      (data: any) => {
        this.books = data;
      },
      (error) => {
        console.error('Erro ao carregar livros', error);
      }
    );
  }
}
