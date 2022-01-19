import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../misc/BooksAPI";
import Book from "../components/Book";

class Search extends Component {
  state = {
    books: [],
  };
  updateQuery = (query) => {
    const searchQuery = query.trim();
    if (searchQuery) {
      BooksAPI.search(searchQuery).then((data) => {
        if (data.error) {
          this.setState({ books: [] });
        } else {
          data = data.map((book) => {
            const bookInShelf = this.props.books.find(
              (thisBook) => thisBook.id === book.id
            );
            if (bookInShelf) book.shelf = bookInShelf.shelf;
            return book;
          });
          this.setState({ books: data });
        }
      });
    }
  };
  render() {
    const { updateBook } = this.props;
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by author or title"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books &&
              books.map((book) => (
                <Book key={book.id} book={book} updateBook={updateBook} />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
