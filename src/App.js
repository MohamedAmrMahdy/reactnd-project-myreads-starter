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
      console.log(this.state.books);
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <Search />} />
        <Route
          exact
          path="/"
          render={() => <BooksList books={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;
