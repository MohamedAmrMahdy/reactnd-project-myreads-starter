import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./misc/BooksAPI";
import "./styles/App.css";
import BooksList from "./views/BooksList";
import Search from "./views/Search";

class BooksApp extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books }));
    });
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(
      this.setState((currentState) => {
        return {
          books: currentState.books.map((thisBook) =>
            thisBook.id === book.id ? book : thisBook
          ),
        };
      })
    );
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => <Search books={books} updateBook={this.updateBook} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <BooksList books={books} updateBook={this.updateBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
