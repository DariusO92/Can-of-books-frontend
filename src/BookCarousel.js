import React from 'react';
import { Button, Carousel } from 'react-bootstrap';

class BookCarousel extends React.Component {
    render() {
        return (
            <>
                <h2>Book Shelf</h2>

                {this.props.books.length ? (
                    <div style={{ display: 'block', width: 700, padding: 30 }}>
                        <Carousel>
                            {this.props.books.map((book, idx) => {
                                return (
                                    <Carousel.Item key={idx}>
                                        <img
                                            className="d-block w-100"
                                            src="https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg"
                                            alt="book"
                                        />
                                        <Carousel.Caption>
                                            <h3>{book.title}</h3>
                                            <p>{book.description}</p>
                                        <Button onClick={() => this.props.deleteBook(book._id)} type="submit" variant="primary">
                                            Delete Book
                                        </Button>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                ) : (
                    <>
                    <h3>No Books Found</h3>
                    <p>Testing</p>
                </>
                )}
            </>

        )
    }
}

export default BookCarousel;
