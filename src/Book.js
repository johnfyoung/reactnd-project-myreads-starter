import React, { Component }  from 'react';
import PropTypes from 'prop-types';

/**
 * @description Stateless functional component represents a Book
 * @constructor
 * @param {Object} props - Component properties
 * @returns {Element}
 */
class Book extends Component {
	state = {
		hovering: false
	};

	render(){
		const {shelves, book } = this.props;
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ book.imageLinks.thumbnail }")` }}></div>
					<div className="book-shelf-changer">
						<select value={book.shelf || 'none'} onChange={ (e) => { this.props.handleBookShelfSelect(book, e.target.value); }}>
							<option value="move" disabled>Move to...</option>
							{shelves.map( s => (<option key={`${book.id}-${s.id}`} value={s.id}>{s.label}</option>) ) }
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors.join(',')}</div>
			</div>
		);
	}
}

/**
 * Validates the expected properties
 */
Book.propTypes = {
	book: PropTypes.object.isRequired,   							// JSON of the book's properties
	shelves: PropTypes.array.isRequired,							// array of BookShelf
	handleBookShelfSelect: PropTypes.func.isRequired	// handler for selecting a bookshelf
};

export default Book;