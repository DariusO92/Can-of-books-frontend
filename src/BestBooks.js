import React from 'react';
import axios from 'axios';
import BookCarousel from './BookCarousel';
// import BookForm from './BookForm';

//need to create a separate component called "bookform" that'll be a form within a modal

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/book`);
      this.setState({
        books: results.data
      })
    } catch (error) {
      console.log('error', error.response);
    }
  }

  // postBook = async (newBook) => {
  //   try {
  //     let results = `${SERVER}/book`
  //     let createdBook = await axios.post(results, newBook);
  //     console.log(createdBook.data);
  //     this.setState({
  //       books: [...this.state.books, createdBook.data]
  //     });
  //   } catch(error) {
  //     console.log('Error: ', error.response.data);
  //   }
  // }

  // deleteBook = async (id) => {
  //   try {
  //     let results = `${SERVER}/book/${id}`;
  //     await axios.delete(results+);
  //     let updatedBooks = this.state.books.filter(book => book._id !== id);
  //     this.setState({
  //       books: updatedBooks
  //     });
  //   } catch(error) {
  //     console.log('Error: ', error.response.data);
  //   }
  // }

  // handleBookSubmit = (e) => {
  //   e.preventDefault();
  //   let book = {
  //     title: e.target.name.value, 
  //     description: e.target.description.value, 
  //     //this is how we the value from a checkbox
  //     status: e.target.status.checked
  //   }
  //   this.postBook(book);
  // }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    return (
      <>

        <h2>Book Shelf</h2>

        {this.state.books.length ? (
          <BookCarousel
            books={this.state.books}
          />

        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
