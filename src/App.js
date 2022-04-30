import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Footer from './Footer';
import BookCarousel from './BookCarousel';
import { Button } from 'react-bootstrap';
import About from './About';
import BookFormModal from './BookFormModal';
import Profile from './Profile';
import Login from './Login';
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
      updateModal: false,
    }
  }

  //BookFormModal modal functions
  hideModal = () => {
    this.setState({
      showModal: false
    });
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  }

  //UpdateBookForm modal functions
  hideUpdateModal = () => {
    this.setState({
      updateModal: false
    });
  }

  openUpdateModal = () => {
    this.setState({
      updateModal: true
    });
  }

  //GET function/request from server to get data from DB
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

  //POST function/request from server to add data into DB through user
  postBook = async (newBook) => {
    try {
      let results = `${SERVER}/book`
      let createdBook = await axios.post(results, newBook);
      console.log(createdBook.data);
      this.setState({
        books: [createdBook.data, ...this.state.books]
      });
    } catch (error) {
      console.log('Error: ', error.response.data);
    }
  }

  //DELETE function/request from server to delete data into DB through user
  deleteBook = async (id) => {
    try {
      let results = `${SERVER}/book/${id}`;
      await axios.delete(results);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      });
    } catch (error) {
      console.log('Error: ', error.response.data);
    }
  }

  //PUT function/request from server to update data into DB through user
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
    } catch (error) {
      console.log('Error: ', error.response.data);
    }
  }


  //handle submit that allows user to add a book
  handleBookSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.title.value)
    let book = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
    }
    this.setState({
      showModal: false
    });
    this.postBook(book);
  }

  //GET request from server to work Auth0
  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {
      // get a token
      // JSON Web Token _ (pronounced JOT)
      const res = await this.props.auth0.getIdTokenClaims();

      // MUST remember the double underscore in __raw
      const jwt = res.__raw;
      console.log(jwt);
      // Get that jwt to log in the console  
    }
  }

  render() {
    return (
      <>
        <Router>
        {this.props.auth0.isAuthenticated ? <Header /> : null}
          <Switch>

            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? 
              <>
                <BookCarousel
                  books={this.state.books}
                  deleteBook={this.deleteBook}
                  showModal={this.state.updateModal}
                  openModal={this.openUpdateModal}
                  hideModal={this.hideUpdateModal}
                  updateBook={this.updateBook}
                  getBooks={this.getBooks}
                  />
              
              <Button className="add-button" onClick={this.openModal} variant="primary" type="submit">
                Add Book
              </Button>
              <BookFormModal
                showModal={this.state.showModal}
                hideModal={this.hideModal}
                handleBookSubmit={this.handleBookSubmit}
                />
              </>
              : 
                <Login />
              }
            </Route>
            <Route path="/profile">
              {this.props.auth0.isAuthenticated ? <Profile /> : <Login />}
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

export default withAuth0(App);
