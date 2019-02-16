
# MyReads Project

Maintain a list of books.

## State Management

In order to keep the Book's dual state (i.e., as either being in a search result, on a shelf, or both), it made sense to keep all state in the App component. The app maintains state for the search `query`, the `books` on the shelves, the search `result`, an `error` message for no search result returned, and whether there is a remote search in progress (`isSearching`).

## Components

The app utilizes 5 sub-components:

1. `BookShelfList`  
  This Stateless component is a container for `BookShelf` components. It is the main conatiner for the home route.
1. `BookShelf`
  This is another Stateless component, used logically to lay out books for a shelf
1. `BookSearch`
  This is a Stateless component that is the main container for the Search route. It has the BookSearchResult as a child component.
1. `BookSearchResult`
  This is a Stateless component for laying out search results
1. `Book`
  This is also a stateless component. It seemed easiest to maintain state about where to display a book outside of the books.
