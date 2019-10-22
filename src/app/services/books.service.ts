import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import { FileStorageService } from './file-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
   

    private books: Book[] = [];
    booksSubject: Subject<Book[]> = new Subject<Book[]>();

   

    emitBooks() {
        this.booksSubject.next(this.books.slice());
    }

    saveBooks() {
        firebase.database().ref('/books').set(this.books);
    }

    getBooks() {
        firebase.database().ref('/books')
            .on('value', (data) => {
                this.books = data.val() ? data.val() : [];
                this.emitBooks();
            }
            );
    }

    getSingleBook(id: number) {
        return new Promise<Book>(
            (resolve, reject) => {
                firebase.database().ref('/books/' + id).once('value').then(
                    (data) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
    }

    removeBook(book: Book) {
        if (book.photo) {
            this.fileService.deleteFile(book.photo).then(
                (error) => { console.log(error); }
            );
        }
      const bookIndexToRemove = this.books.findIndex(
        (bookEl) => {
          if(bookEl === book) {
            return true;
          }
        }
        );
        this.books.length
      this.books.splice(bookIndexToRemove, 1);
      this.saveBooks();
      this.emitBooks();
    }

    editBook(index: number, book: Book) {
        if (this.books[index].photo != book.photo) {
            this.fileService.deleteFile(this.books[index].photo);
        }
        this.books[index] = book;
        this.saveBooks();
        this.emitBooks();
    }

    constructor(private fileService: FileStorageService) {
        this.getBooks();
    }
}
