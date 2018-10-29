import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

/**
 * @description represents the list of BookShelf's
 * @param Object props
 */
const BookShelfList = props => {
	return (
		<div className="list-books-content">
			<div>
				{ 
					props.shelves.map(s => (
						<BookShelf
							key={`bookshelf-${s.id}`}
							shelf={s} books={props.books.filter( b => b.shelf === s.id )}
							shelves={props.shelves}
							handleBookShelfSelect={props.handleBookShelfSelect}
						/>
					))
				}
			</div>
		</div>
	);
}

BookShelfList.propTypes = {
	shelves: PropTypes.array.isRequired,							// array of BookShelf
	books: PropTypes.array.isRequired,								// array of the user's Book's
	handleBookShelfSelect: PropTypes.func.isRequired	// handler for selecting a book shelf
};


export default BookShelfList;