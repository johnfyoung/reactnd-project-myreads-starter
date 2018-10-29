import React, { Component } from 'react';
import BookSearchResult from './BookSearchResult';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @description Stateful Coponent representing a Book search, including a query bar and search results
 * @class
 */
class BookSearch extends Component {
	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={ (e) => this.props.handleQuery(e.target.value)} value={this.props.query} />
					</div>
				</div>
				{
					// prevent the screen showing anything while the remote search is being performed
					(!this.props.isSearching &&
					<BookSearchResult
						books={this.props.books}
						error={this.props.error}
						shelves={this.props.shelves}
						handleBookShelfSelect={this.props.handleBookShelfSelect}
					/>
					)
				}
			</div>
		);
	}
}

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