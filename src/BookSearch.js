import React, { Component } from 'react';
import BookSearchResult from './BookSearchResult';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @description Stateful Coponent representing a Book search, including a query bar and search results
 * @class
 */
class BookSearch extends Component {
	state = {
		query: ''   // the query bar's value
	};

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
					NOTES: The search from BooksAPI is limited to a particular set of search terms.
					You can find these search terms here:
					https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

					However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
					you don't find a specific author or title. Every search is limited by search terms.
					*/}
						<input type="text" placeholder="Search by title or author" />
					</div>
				</div>
				<BookSearchResult books={this.props.books}/>
			</div>
		);
	}
}

BookSearch.propTypes = {
	books: PropTypes.array.isRequired   // array of the user's books
};

export default BookSearch;