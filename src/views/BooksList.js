import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";

class BooksList extends Component {
  render() {
    const { books, updateBook } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            title="Currently Reading"
            books={books.filter((book) => book.shelf === "currentlyReading")}
            updateBook={updateBook}
          />
          <BookShelf
            title="Want to Read"
            books={books.filter((book) => book.shelf === "wantToRead")}
            updateBook={updateBook}
          />
          <BookShelf
            title="Read"
            books={books.filter((book) => book.shelf === "read")}
            updateBook={updateBook}
          />
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>search</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BooksList;
