import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

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
      console.log('error', error.response);
    }
  }

  componentDidMount() {
    this.getBooks();
  }
  render() {

    /* TODO: render all the books in a Carousel */
    // <p key={idx}>{element.title}</p>


    return (
      <>
      
      <h2>Book Shelf</h2>

       {this.state.books.length ? (
      <div style={{display:'block',width:700,padding:30}}>
        <Carousel>

        {this.state.books.map((book) => {
          return (
            <Carousel.Item>
              <img
              className="d-block w-100"
                src="https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg"
                alt="book"
              />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>

        {/* render component this.state.books(send as prop to component, this.props.books) */}
      </div>


       ) : (
           <h3>No Books Found :(</h3>
       )}
        </>


    )
  }
}

export default BestBooks;
