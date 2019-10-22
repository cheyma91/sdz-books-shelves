import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy{

    books: Book[] = [];
    booksSubscription: Subscription;
    msg: string = "";
    constructor(private booksService: BooksService, private router: Router) { }

    ngOnInit() {
        this.booksSubscription = this.booksService.booksSubject.subscribe(
            (data) => { this.books = data; },
            (error)=> { this.msg = error;}
        );

        this.booksService.emitBooks();
    }

    ngOnDestroy() {
        this.booksSubscription.unsubscribe();
    }

    onDelete(book: Book) {
        this.booksService.removeBook(book);
    }
}
