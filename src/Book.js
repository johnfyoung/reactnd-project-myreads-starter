import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Stateless functional component represents a Book
 * @constructor
 * @param {Object} props - Component properties
 * @returns {Element}
 */
const Book = (props) =>  {
	const {shelves, book } = props;
	const shelf = shelves.find( s => s.id === book.shelf ) || null;
	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ 
					backgroundImage: `url("${ book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'images/book.png' }")`,
					backgroundColor: book.imageLinks && book.imageLinks.thumbnail ? 'transparent' : '#ccc',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center'
				}}>
				</div>
				{(props.showShelf && book.shelf && 
					<div className="book-shelf-name">{shelf.label}</div>
				)}
				<div className="book-shelf-changer">
					<select value={book.shelf || 'none'} onChange={ (e) => { props.handleBookShelfSelect(book, e.target.value); }}>
						<option value="move" disabled>Move to...</option>
						{shelves.map( s => (<option key={`${book.id}-${s.id}`} value={s.id}>{s.label}</option>) ) }
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			{(book.authors && <div className="book-authors">{book.authors.join(',')}</div>)}
			
		</div>
	);
};

Book.propTypes = {
	book: PropTypes.object.isRequired,   							// JSON of the book's properties
	shelves: PropTypes.array.isRequired,							// array of BookShelf
	handleBookShelfSelect: PropTypes.func.isRequired,	// handler for selecting a bookshelf
	showShelf: PropTypes.bool													// optional prop to show shelf
};

export default Book;