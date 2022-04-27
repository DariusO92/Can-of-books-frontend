import React from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
// import BestBooks from './BestBooks';
import BookCarousel from './BookCarousel';
import { Button } from 'react-bootstrap';
import About from './About';
import BookFormModal from './BookFormModal';
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
      // name: '',
      // description: '',
      // status: ''

    }
  }

hideModal = () => {
  this.setState({
    showModal:false
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
        books: [...this.state.books, createdBook.data]
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

  handleBookSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.title.value)
    let book = {
      title: e.target.title.value, 
      description: e.target.description.value, 
      //this is how we the value from a checkbox
      status: e.target.status.value,
      
    }
    this.setState({
      showModal:false
    });
    this.postBook(book);
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <>
        <Router>
          <Header
          // openModal={this.openModal}
          />
          <Switch>
            <Route exact path="/">
              {/* <BestBooks /> */}
              <Button onClick={this.openModal} variant="primary" type="submit">
          Add Book
        </Button>
              <BookCarousel 
              books={this.state.books}
              deleteBook={this.deleteBook}
              /> 
              <BookFormModal
              showModal={this.state.showModal}
              hideModal={this.hideModal}
              // name={this.state.name}
              // description={this.state.description}
              // status={this.state.status}
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
// delete functionality needs to go to the carousel
// books state needs to go into delete
// possible equals postbooks not in props