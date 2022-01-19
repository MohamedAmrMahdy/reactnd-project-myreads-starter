import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../misc/BooksAPI";
import Book from "../components/Book";
import PropTypes from "prop-types";
import { debounce } from "lodash";

class Search extends Component {
  state = {
    searchStatus: "idle",
    books: [],
  };

  componentDidMount() {
    this.updateQuery = debounce(this.updateQuery, 500);
  }

  updateQuery = (query) => {
    const searchQuery = query.trim();
    if (searchQuery) {
      this.setState({ searchStatus: "searching" });
      BooksAPI.search(searchQuery).then((data) => {
        if (data.error) {
          this.setState({ searchStatus: "fail", books: [] });
        } else {
          data = data.map((book) => {
            const bookInShelf = this.props.books.find(
              (thisBook) => thisBook.id === book.id
            );
            if (bookInShelf) book.shelf = bookInShelf.shelf;
            return book;
          });
          this.setState({ searchStatus: "success", books: data });
        }
      });
    } else {
      this.setState({ searchStatus: "idle", books: [] });
    }
  };
  render() {
    const { updateBook } = this.props;
    const { searchStatus, books } = this.state;
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
            {searchStatus === "searching" && <div>Searching...</div>}
            {searchStatus === "fail" && <div>Books Not Found</div>}
            {searchStatus === "success" &&
              books.map((book) => (
                <Book key={book.id} book={book} updateBook={updateBook} />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  updateBook: PropTypes.func.isRequired,
};

export default Search;
