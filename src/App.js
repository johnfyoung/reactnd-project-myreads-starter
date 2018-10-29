import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookSearch from './BookSearch';
import BookShelfList from './BookShelfList';
import { Route, Link } from 'react-router-dom';


/**
 * Default Shelves
 */
const bookShelves = [
	{
		id: 'currentlyReading',
		label: 'Currently Reading'
	},
	{
		id: 'wantToRead',
		label: 'Want to Read'
	},
	{
		id: 'read',
		label: 'Read'
	}
];

class BooksApp extends Component {
	state = {
		books:[]
	};

	componentDidMount() {
		BooksAPI.getAll()
			.then(books => {
				this.setState(() => ({
					books
				}));
			});
	}

	/**
	 * @description handle when a book shelf is selected for a particular book
	 * @param Object book - a Book
	 * @param string shelfID - a shelf's id property
	 */
	handleBookShelfSelect = ( book, shelfID ) => {
		BooksAPI.update(book, shelfID).then(()=> {
			this.setState( prevState => ({
				books: prevState.books.map( b => {
					if(b.id === book.id) {
						b.shelf = shelfID;
					}
					return b;
				})
			}));
		});
	};

	render() {
		return (
			<div className="app">
				{
					<div>
						<Route exact path="/" render={ () => (
							<div className="list-books">
								<div className="list-books-title">
									<h1>MyReads</h1>
								</div>
								<BookShelfList
									shelves={bookShelves}
									books={this.state.books}
									handleBookShelfSelect={this.handleBookShelfSelect}
								/>
								<div className="open-search">
									<Link to="/search">Add a book</Link>
								</div>
							</div >
						)} />

						<Route exact path="/search" render={() => (
							<BookSearch books={this.state.books} />
						)}/>
					</div>
				}
			</div>
		);
	}
}

export default BooksApp;
