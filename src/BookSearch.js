import React from 'react';
import BookSearchResult from './BookSearchResult';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DebounceInput from 'react-debounce-input';

/**
 * @description Statless Component representing a Book search, including a query bar and search results
 * @class
 */
const BookSearch = (props) => {
	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link to="/" className="close-search">Close</Link>
				<div className="search-books-input-wrapper">
					<DebounceInput type="text" placeholder="Search by title or author" debounceTimeout={500} onChange={ (e) => props.handleQuery(e.target.value)} value={props.query} />
				</div>
			</div>
			{
				// prevent the screen showing anything while the remote search is being performed
				(!props.isSearching &&
				<BookSearchResult
					books={props.books}
					error={props.error}
					shelves={props.shelves}
					handleBookShelfSelect={props.handleBookShelfSelect}
				/>
				)
			}
		</div>
	);
};

BookSearch.propTypes = {
	books: PropTypes.array.isRequired,								// array of the user's books
	shelves: PropTypes.array.isRequired,							// array of BookShelf
	query: PropTypes.string.isRequired,								// the query term
	isSearching: PropTypes.bool.isRequired,						// is the app searching the remote database
	result: PropTypes.array,													// the search result
	error: PropTypes.string,													// was there a search error?
	handleQuery: PropTypes.func.isRequired,						// handler for the query
	handleBookShelfSelect: PropTypes.func.isRequired	// handler for selecting a bookshelf
};

export default BookSearch;