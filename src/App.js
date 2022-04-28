import React from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import BookCarousel from './BookCarousel';
import { Button } from 'react-bootstrap';
import About from './About';
import BookFormModal from './BookFormModal';
// import BestBooks from './BestBooks';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      updateModal: false
    }
  }

hideModal = () => {
  this.setState({
    showModal:false
  });
}

hideUpdateModal = () => {
  this.setState({
    updateModal:false
  });
}

openUpdateModal = () => {
  this.setState({
    updateModal:true
  });
}

openModal = () => {
  this.setState({
    showModal:true
  });
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

  postBook = async (newBook) => {
    try {
      let results = `${SERVER}/book`
      let createdBook = await axios.post(results, newBook);
      console.log(createdBook.data);
      this.setState({
        books: [createdBook.data, ...this.state.books]
      });
    } catch(error) {
      console.log('Error: ', error.response.data);
    }
  }

  deleteBook = async (id) => {
    try {
      let results = `${SERVER}/book/${id}`;
      await axios.delete(results);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      });
    } catch(error) {
      console.log('Error: ', error.response.data);
    }
  }

  updateBook = async (bookToUpdate) => {
    try {
      let results = `${SERVER}/book/${bookToUpdate._id}`
      let updatedBook = await axios.put(results, bookToUpdate);
      let updatedBookArr = this.state.books.map(existingBook => {
          return existingBook._id === bookToUpdate._id
          ? updatedBook.data
          : existingBook;
      })
      // console.log(updatedBook.data);
      this.setState({
        books: updatedBookArr,
        updateModal: false
      });
    } catch(error) {
      console.log('Error: ', error.response.data);
    }
  }



  handleBookSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.title.value)
    let book = {
      title: e.target.title.value, 
      description: e.target.description.value, 
      status: e.target.status.value,
    }
    this.setState({
      showModal:false
    });
    this.postBook(book);
  }

  changeBookInfo = (book) => {
    this.setState({
      bookInfo: book
    })
  }


  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <>
        <Router>
          <Header
          />
          <Switch>
            <Route exact path="/">
              {/* <BestBooks /> */}
        {this.state.books.length > 0 ? (
              <BookCarousel 
              books={this.state.books}
              deleteBook={this.deleteBook}
              showModal={this.state.updateModal}
              openModal={this.openUpdateModal}
              hideModal={this.hideUpdateModal}
              updateBook={this.updateBook}
              /> 
        ) : (
            <p>No Books Found</p>
        )}
              <Button className="add-button" onClick={this.openModal} variant="primary" type="submit">
          Add Book
        </Button>
              <BookFormModal
              showModal={this.state.showModal}
              hideModal={this.hideModal}
              handleBookSubmit={this.handleBookSubmit}
              />
            </Route>
            <Route path="/about">
              <About />  
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
