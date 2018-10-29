import React from 'react';
import Book from './Book.js';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

const BookItem = posed.li();

/**
 * @description represents a Book Shelf
 * @constructor
 * @param {Object} props 
 */
const BookShelf = props => {
	return (
		<div className={`bookshelf bookshelf-${props.shelf.id}`}>
			<h2 className="bookshelf-title">{ props.shelf.label }</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					<PoseGroup>
						{
							props.books.map( b => ( <BookItem key={b.id}><Book book={b} shelves={props.shelves} handleBookShelfSelect={props.handleBookShelfSelect}/></BookItem>) )
						}
					</PoseGroup>
				</ol>
			</div>
		</div>
	);
};

BookShelf.propTypes = {
	shelf: PropTypes.object.isRequired,								// JSON book shelf
	books: PropTypes.array.isRequired,								// array of the user's books
	shelves: PropTypes.array.isRequired,							// array of BookShelf
	handleBookShelfSelect: PropTypes.func.isRequired	// handler for selecting a book shelf
};

export default BookShelf;