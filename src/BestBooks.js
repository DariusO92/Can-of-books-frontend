import React from 'react';
import axios from 'axios';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/book`);
      this.setState({
        books: results.data
      })
    } catch (error) {
      console.log('error',error.response);
    }
  }

  componentDidMount(){
    this.getBooks();
  }
  render() {

    /* TODO: render all the books in a Carousel */
    let books = this.state.books.map( (element, idx) => (
      <p key={idx}>{element.title}</p>
    ))

    return (
      <>
        <h2>Book Shelf</h2>
       
        {this.state.books.length ? (
          // <p>Book Carousel coming soon</p>
          <>
          {books} 
          {/* render component this.state.books(send as prop to component, this.props.books) */}
          </>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
