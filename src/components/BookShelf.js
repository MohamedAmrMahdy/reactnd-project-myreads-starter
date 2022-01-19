import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const BookShelf = ({ title, books, updateBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} updateBook={updateBook} />
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
};

export default BookShelf;
