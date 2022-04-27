import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';


class BookFormModal extends React.Component {
  render() {
    return (
    <>
    <Modal
    show={this.props.showModal}
    onHide={this.props.hideModal}
    >
      <Modal.Header closeButton/>
      <Form onSubmit={this.props.handleBookSubmit}>
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
              <Button type="submit">Add Book</Button>
      </Form>
    </Modal>
    </>  
    )
  }
}

export default BookFormModal;
