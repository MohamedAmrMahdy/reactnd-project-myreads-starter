import React from "react";
import imageNotFound from "../images/notfound.jpg";
import PropTypes from "prop-types";

const Book = ({ book, updateBook }) => {
  const onShelfChange = (e) => {
    e.preventDefault();
    updateBook(book, e.target.value);
  };

  if (!book.shelf) book.shelf = "none";

  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.thumbnail : imageNotFound
              })`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={onShelfChange} defaultValue={book.shelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors &&
            book.authors.map((author, i) => <p key={i}>{author}</p>)}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
};

export default Book;
