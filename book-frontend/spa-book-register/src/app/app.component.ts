import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' // Deve ser styleUrls (veja correção abaixo)
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { title: '', author: '', publicationYear: 0 };
  title = 'book-frontend';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  addBook() {
    console.log('Adicionando livro:', this.newBook);
    this.bookService.addBook(this.newBook).subscribe(() => {
      console.log('Livro adicionado com sucesso');
      this.loadBooks();
      this.newBook = { title: '', author: '', publicationYear: 0 };
    }, error => {
      console.error('Erro ao adicionar livro:', error);
    });
  }
}