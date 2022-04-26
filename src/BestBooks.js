import React from 'react';
import axios from 'axios';
import BookCarousel from './BookCarousel';

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
