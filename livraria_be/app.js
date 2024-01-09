const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lucca24',
  database: 'library',
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// ...

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res.status(500).send('Erro ao obter usuários');
      } else {
        res.json(results);
      }
    });
  });
  
  // Rota para adicionar um novo usuário
  app.post('/users', (req, res) => {
    const { nome, cognome, email } = req.body;
    db.query('INSERT INTO users (nome, cognome, email) VALUES (?, ?, ?)', [nome, cognome, email], (err, result) => {
      if (err) {
        res.status(500).send('Erro ao adicionar usuário');
      } else {
        res.status(201).send('Usuário adicionado com sucesso');
      }
    });
  });
  
  // Rota para obter um usuário por ID
  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        res.status(500).send('Erro ao obter usuário');
      } else if (results.length === 0) {
        res.status(404).send('Usuário não encontrado');
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Rota para atualizar um usuário por ID
  app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { nome, cognome, email } = req.body;
    db.query('UPDATE users SET nome = ?, cognome = ?, email = ? WHERE id = ?', [nome, cognome, email, userId], (err, result) => {
      if (err) {
        res.status(500).send('Erro ao atualizar usuário');
      } else {
        res.send('Usuário atualizado com sucesso');
      }
    });
  });
  
  // Rota para excluir um usuário por ID
  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        res.status(500).send('Erro ao excluir usuário');
      } else {
        res.send('Usuário excluído com sucesso');
      }
    });
  });
  
  // Rota para obter todos os livros
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
      if (err) {
        res.status(500).send('Erro ao obter livros');
      } else {
        res.json(results);
      }
    });
  });
  
  // Rota para adicionar um novo livro
  app.post('/books', (req, res) => {
    const { title, author, isbn, added_date, plot, user_id } = req.body;
    db.query('INSERT INTO books (title, author, isbn, added_date, plot, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, author, isbn, added_date, plot, user_id],
      (err, result) => {
        if (err) {
          res.status(500).send('Erro ao adicionar livro');
        } else {
          res.status(201).send('Livro adicionado com sucesso');
        }
      }
    );
  });
  
  // Rota para obter um livro por ID
  app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, results) => {
      if (err) {
        res.status(500).send('Erro ao obter livro');
      } else if (results.length === 0) {
        res.status(404).send('Livro não encontrado');
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Rota para atualizar um livro por ID
  app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author, isbn, added_date, plot, user_id } = req.body;
    db.query('UPDATE books SET title = ?, author = ?, isbn = ?, added_date = ?, plot = ?, user_id = ? WHERE id = ?',
      [title, author, isbn, added_date, plot, user_id, bookId],
      (err, result) => {
        if (err) {
          res.status(500).send('Erro ao atualizar livro');
        } else {
          res.send('Livro atualizado com sucesso');
        }
      }
    );
  });
  
  // Rota para excluir um livro por ID
  app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    db.query('DELETE FROM books WHERE id = ?', [bookId], (err, result) => {
      if (err) {
        res.status(500).send('Erro ao excluir livro');
      } else {
        res.send('Livro excluído com sucesso');
      }
    });
  });
  
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
