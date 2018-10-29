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
		books:[],
		query:'',
		result:[],
		error:'',
		isSearching:false
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
		const shelf = shelfID === 'none' ? null : shelfID;

		BooksAPI.update(book, shelfID).then(()=> {
			this.setState( prevState => {
				if(shelf) {
					const index = prevState.books.findIndex( b => b.id === book.id);

					if(index === -1) {
						return {
							books: [...prevState.books, book],
							result: this.findAndSetShelf(prevState.result, book.id, shelfID)
						};
					} else {
						return {
							books: this.findAndSetShelf(prevState.books, book.id, shelfID),
							result: this.findAndSetShelf(prevState.result, book.id, shelfID)
						};
					}

				} else {
					return {
						books: prevState.books.filter( b => b.id !== book.id ),
						result: this.findAndSetShelf(prevState.result, book.id, shelf)
					};
				}
			});
		});
	};

	/**
	 * @description find a book by book id in a list of books and set its shelf value
	 * @param array books 
	 * @param string bookId 
	 * @param string shelfID 
	 */
	findAndSetShelf(books, bookId, shelfID) {
		return books.map( b => {
			if(b.id === bookId) {
				if(shelfID) {
					b.shelf = shelfID;
				} else {
					delete(b.shelf);
				}
				return b;
			}
			return b;
		});
	}

	/**
	 * @description event handler to handle any change in the query term
	 * @param string q - the query
	 */
	handleQuery = (q) => {
		this.setState({query: q, isSearching:true }, () => {
			if(this.state.query) {
				BooksAPI.search(this.state.query)
					.then( data => {
						if(data.error) {
							this.setState({
								result:[],
								error: 'No results found',
								isSearching: false
							});
						} else {
							this.setState( prevState => ({
								result: data.map( foundBook => {
									const inCollection = prevState.books.find(b => b.id === foundBook.id);
									if(inCollection) foundBook.shelf = inCollection.shelf;
									return foundBook; 
								}),
								error: '',
								isSearching: false
							}));
						}
					});
			} else {
				this.setState({
					result:[],
					isSearching: false,
					error: false
				});
			}
		});
	};

	render() {
		return (
			<div className="app">
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

				<Route key="screen-search" exact path="/search" render={() => (
					<BookSearch
						books={this.state.result}
						query={this.state.query}
						error={this.state.error}
						shelves={bookShelves}
						isSearching={this.state.isSearching}
						handleQuery={this.handleQuery}
						handleBookShelfSelect={this.handleBookShelfSelect}
					/>
				)}/>
			</div>
		);
	}
}

export default BooksApp;
