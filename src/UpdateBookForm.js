import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


class UpdateBookForm extends React.Component {

  handleUpdateSubmit = (e) => {
  e.preventDefault();
  let bookWithUpdate = {
    //IF user changes value, update
    //IF they don't, keep the same
    title: e.target.title.value || this.props.bookInfo.title,
    description: e.target.description.value || this.props.bookInfo.description,
    status: e.target.status.value || this.props.bookInfo.status,
    _id: this.props.bookInfo._id,
    _v: this.props.bookInfo._v
  }
  this.props.updateBook(bookWithUpdate)
  //send data back to App.js
}



  render() {
    return (
      <>
      <Modal
          show={this.props.showModal}
          onHide={this.props.hideModal}
        >
          {/* brings in modal functions from app.js as props to handle modal functionality  */}
          <Modal.Header closeButton />
          <Form onSubmit={this.handleUpdateSubmit}>
            {/* brings in handle from app.js as props */}
            <Form.Group controlId="title">
              <Form.Label>title</Form.Label>
              <Form.Control type="text" placeholder={this.props.bookInfo.title}/>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" placeholder={this.props.bookInfo.description}/>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>status</Form.Label>
              <Form.Control type="text" placeholder={this.props.bookInfo.status}/>
            </Form.Group>
            {/* everything above represents labels on the form */}
            <Button type="submit">Update Book</Button>
            {/* button submit references line 14 to save on repitition */}
          </Form>
        </Modal>
      </>
    )
  }
}

export default UpdateBookForm;
