import React from 'react';
import Modal from 'react-bootstrap';
import Form from 'react-bootstrap';
import Button from 'react-bootstrap';


class UpdateBookForm extends React.Component {

  handleUpdateSubmit = e.preventDefault();
  console.log(e.target.title.value)
  // let book = {
  //   title: e.target.title.value, 
  //   description: e.target.description.value, 
  //   status: e.target.status.value,
  // }
  this.setState({
    showModal:false
  });
  this.postBook(book);
  



  render() {
    return (
      <>
      <Modal
          show={this.props.showModal}
          onHide={this.props.hideModal}
        >
          {/* brings in modal functions from app.js as props to handle modal functionality  */}
          <Modal.Header closeButton />
          <Form onSubmit={this.props.handleBookSubmit}>
            {/* brings in handle from app.js as props */}
            <Form.Group controlId="title">
              <Form.Label>title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>status</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            {/* everything above represents labels on the form */}
            <Button type="submit">Add Book</Button>
            {/* button submit references line 14 to save on repitition */}
          </Form>
        </Modal>
      </>
    )
  }
}

export default UpdateBookForm;
