import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

class Contact extends Component {
  render () {
    return (
      <>
        <Container>
          <h2>Get in touch!</h2>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Your name' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='name@example.com' />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Message</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
          </Form>
        </Container>
      </>
    )
  }
}

export default Contact
