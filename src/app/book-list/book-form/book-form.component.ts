import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { FileStorageService } from '../../services/file-storage.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
    bookForm: FormGroup;
    msg: string;
    book: Book = new Book('', '');
    id: number | undefined = -1;

    constructor(private router: Router,
        private bookService: BooksService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private fileService: FileStorageService) { }

    ngOnInit() {
        this.initForm();
        this.id = this.route.snapshot.params['id'];
        this.id = this.id ? this.id : -1;
        if (this.id != -1) {
            this.bookService.getSingleBook(this.id).then(
                (book) => {
                    this.book = book;
                    this.initForm();
                },
                (error) => {
                    this.msg = error;
                }
            );
        }  
    }

    initForm() {
        this.bookForm = this.formBuilder.group({
            title: [this.book.title, Validators.required],
            author: [this.book.author, Validators.required],
            synopsis: this.book.synopsis
        });
    }

    onSubmit() {
        const title: string = this.bookForm.get('title').value;
        const author: string = this.bookForm.get('author').value;
        const synopsis: string = this.bookForm.get('synopsis').value;
        this.book.author = author;
        this.book.synopsis = synopsis;
        this.book.title = title;
        if (this.id === -1) {
            this.bookService.createNewBook(this.book);
        }
        else {
            this.bookService.editBook(this.id, this.book);
        }
        this.router.navigate(['/books']);
    }

    detectFiles(event) {
        this.bookForm.setErrors({ emitEvent:true});
        this.fileService.uploadFile(event.target.files[0]).then(
            (url: string) => {
                this.book.photo = url;
                this.bookForm.setErrors(null);
            },
            (error) => { this.msg = error; }
        );
    }
}
