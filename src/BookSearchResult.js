import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

/**
 * @description Stateless functional component representing the result of a book search
 * @constructor
 * @param {Object} props - Component properties
 * @returns {Element}
 */
const BookSearchResult = props => {
	return (
		<div className="search-books-results">
			{ props.error ? (
				<div className="search-books-results-error">{props.error}</div>
			) : (
				<ol className="books-grid">
					{
						(props.books && props.books.map( b => ( <li key={b.id}><Book book={b} shelves={props.shelves} handleBookShelfSelect={props.handleBookShelfSelect} showShelf={true}/></li>) ))
					}
				</ol>
			)}
			
		</div>
	);
};

BookSearchResult.propTypes = {
	books: PropTypes.array,								// array of books
	error: PropTypes.string,													// an optional error message
	shelves: PropTypes.array.isRequired,							// array of BookShelf
	handleBookShelfSelect: PropTypes.func.isRequired	// handler for selecting a bookshelf
};

export default BookSearchResult;