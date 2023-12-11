import React, { Component, useEffect, useState } from 'react';
import S3Uploader from '../../utils/S3Uploader';
// import BucketList from '../../utils/S3Reader';
import GetFile from '../../utils/S3Reader';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/esm/Form';
import GalleryUpdate from './GalleryUpdate';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import { Col } from 'react-bootstrap';

function GalleryList() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const [galleries, setGalleries] = useState<any[]>([])

  const fetchGalleryData = () => {
    fetch("http://localhost:3000/galleries")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setGalleries(data)
      })
      .catch(err => { console.error('Woopsie!', err) })
  }

  useEffect(() => {
    fetchGalleryData()
  }, [])

  return (
    <>
      {galleries.length > 0 && (
        <Row xs={4} md={3} className="g-4">
          {galleries.map((gallery, idx) => (
            <Col key={idx}>
              <Card className='gallery-image' key={gallery.id} style={{ width: '18rem' }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                {isHovering && (
                  // <Link className="card-edit" to={'edit'}>Edit</Link>
                  // <span className='card-edit' onClick={GalleryUpdate}>Edit</span>
                  <GalleryEdit data={gallery} />
                )}
                {/* <Card.Img variant="top" src="https://picsum.photos/300/180/?blur" /> */}
                <Card.Img variant="top" src="http://satyr.dev/300x180" />
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>{gallery.title}</Card.Title>¸
                  <Card.Text>
                    Gallery Description
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">View</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        // <div className='row'>
        // </div>
      )}
    </>
  )
}

function GalleryCreate() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  // @ts-ignore
  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value
    })
  }

  // @ts-ignore
  const handleChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value
    });
  };

  const galleryCreate = () => {
    console.log('Data:', formData)
    // sending PATCH request with fetch API in javascript
    fetch(`http://localhost:3000/galleries`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",

      // Fields that to be updated are passed
      body: JSON.stringify({
        title: formData.title,
        description: formData.description
      })
    })
      .then(function (response) {
        // console.log('response', response);
        // console.log('response', response.json());
        return response;
      })
      .then(function (data) {
        console.log(data);
        handleClose();
        GalleryList();
      });
    // handleClose();
  }

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>New</Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="galleryCreateForm.GalleryTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onChange={handleTitleChange} value={formData.title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="galleryCreateForm.GalleryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleChange} value={formData.description} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={galleryCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function GalleryEdit(data: any) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    title: data.data.title,
    description: data.data.description || ''
  })

  // @ts-ignore
  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value
    })
  }

  // @ts-ignore
  const handleChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value
    });
  };

  // @ts-ignore
  const galleryUpdate = () => {
    console.log('Data:', formData)
    // sending PATCH request with fetch API in javascript
    fetch(`http://localhost:3000/galleries?id=eq.${data.data.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",

      // Fields that to be updated are passed
      body: JSON.stringify({
        title: formData.title,
        description: formData.description
      })
    })
      .then(function (response) {
        // console.log('response', response);
        // console.log('response', response.json());
        return response;
      })
      .then(function (data) {
        console.log(data);
        handleClose();
        GalleryList();
      });
  };

  if (show) {
    console.log('Data:', data)
    console.log('formData:', formData)
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Edit
      </Button> */}
      <span className='card-edit' onClick={handleShow}>Edit</span>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="galleryEditForm.GalleryTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onChange={handleTitleChange} value={formData.title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="galleryEditForm.GalleryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleChange} value={formData.description} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={galleryUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class Galleries extends Component {
  render() {
    return (
      <>
        <h2>Galleries</h2>
        <GalleryCreate />
        <br />
        <br />
        <GalleryList />
        {/* <S3Uploader /> */}
        {/* <GetFile prefix={'daire-hardesty-logo'} /> */}
        {/* <BucketList /> */}
      </>
    );
  }
}

export default Galleries;