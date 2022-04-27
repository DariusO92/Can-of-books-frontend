import React from 'react';
import { Button, Carousel } from 'react-bootstrap';

let caroBook = "https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg"
// put image url as separate variable above all code for cleaner look

class BookCarousel extends React.Component {
  render() {
    return (
      <>
        <h2>Book Shelf</h2>
          <div style={{ display: 'block', width: 700, padding: 30 }}>
            <Carousel>
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
                      <Button onClick={() => this.props.deleteBook(book._id)} type="submit" variant="primary">
                        {/* brings in deleteBook function from app.js as props. Must be in format of arrow function to allow books to render before this function is enacted */}
                        Delete Book
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </div>
      </>

    )
  }
}

export default BookCarousel;
