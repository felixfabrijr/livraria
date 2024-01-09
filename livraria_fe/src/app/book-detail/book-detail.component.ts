// book-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: string = ''; // Adicione a inicialização
  book: any = {}; // Adicione a inicialização

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.loadBookDetails();
  }

  loadBookDetails() {
    this.apiService.getBookById(this.id).subscribe(
      (data: any) => {
        this.book = data;
      },
      (error) => {
        console.error('Erro ao carregar detalhes do livro', error);
      }
    );
  }
}
