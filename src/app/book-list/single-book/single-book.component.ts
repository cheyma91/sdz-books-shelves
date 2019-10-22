import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
    book: Book = new Book('', '');
    bookIndex: number = -1;
    msg: string;
    constructor(private route: ActivatedRoute, private bookService: BooksService, private router: Router) { }

    ngOnInit() {
        this.bookIndex = this.route.snapshot.params['id'];
        this.bookService.getSingleBook(this.bookIndex).then(
            (book) => { this.book = book; },
            (error) => { this.msg = error; }
        );
    }

    onDelete(book) {
        this.bookService.removeBook(book);
        this.router.navigate(['/books']);
    }

}
