import React from 'react';
import UpdateBookForm from './UpdateBookForm';
import './BookCarousel.css';
import { Button, Carousel } from 'react-bootstrap';

let caroBook = "https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg"
// put image url as separate variable above all code for cleaner look

class BookCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false,
      bookInfo: {}
    }
  }

  handleUpdateButton = (book) => {
    // e.preventDefault();
    this.props.openModal();
    this.changeBookInfo(book);
    this.setState({
      showUpdateForm: true
    })
  }

  changeBookInfo = (book) => {
    this.setState({
      bookInfo: book
    })
  }

  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    return (
      <>
      {
        this.state.showUpdateForm &&
        <UpdateBookForm 
        books={this.props.books}
       showModal={this.props.showModal}
       hideModal={this.props.hideModal}
       updateBook={this.props.updateBook}
       bookInfo={this.state.bookInfo}
       />
      }

        <h2 className="book-shelf">Book Shelf</h2>
        {this.props.books.length > 0 ? (
          <div className="carousel-block" style={{ display: 'block', width: 700, padding: 30, align: 'center' }}>
            <Carousel align="center">
              {this.props.books.map((book, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100"
                      src={caroBook}
                      alt="book"
                    />
                    <Carousel.Caption>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <Button className="update-button" onClick={() => this.handleUpdateButton(book)}>
                        Update
                      </Button>
                      <Button className="delete-button" onClick={() => this.props.deleteBook(book._id)} type="submit" variant="primary">
                        {/* brings in deleteBook function from app.js as props. Must be in format of arrow function to allow books to render before this function is enacted */}
                        Delete
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </div>
          ) : (
            <p>No Books Found</p>
          )}
      </>

    )
  }
}

export default BookCarousel;
