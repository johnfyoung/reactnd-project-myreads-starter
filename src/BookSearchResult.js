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
			<ol className="books-grid"></ol>
		</div>
	);
};

BookSearchResult.propTypes = {
	books: PropTypes.array.isRequired   // array of books
};

export default BookSearchResult;