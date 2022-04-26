import React from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
// import BestBooks from './BestBooks';
import BookCarousel from './BookCarousel';
import About from './About';
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
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* <BestBooks /> */}
              <BookCarousel 
              books={this.state.books}
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
