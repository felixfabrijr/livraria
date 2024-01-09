// login.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Adicione a inicialização
  password: string = ''; // Adicione a inicialização
  errorMessage: string = ''; // Adicione a inicialização

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.authenticate(this.username, this.password).subscribe(
      (response) => {
        console.log('Autenticação bem-sucedida', response);
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        console.error('Erro durante a autenticação', error);
      }
    );
  }
}
