import React, { Component, useEffect, useState } from 'react';
import S3Uploader from '../../utils/S3Uploader';
// import BucketList from '../../utils/S3Reader';
import GetFile from '../../utils/S3Reader';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/esm/Form';

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
      <Button variant="outline-dark">New</Button>{' '}
      <br />
      <br />
      {galleries.length > 0 && (
        <div>
          {galleries.map(gallery => (
            <Card className='gallery-image' key={gallery.id} style={{ width: '18rem' }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              {isHovering && (
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
          ))}
        </div>
      )}
    </>
  )
}

function GalleryEdit(data: any) {
  console.log('Data:', data)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    title: data.data.title,
    description: ''
  })

  // @ts-ignore
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.title]: e.target.description
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="galleryEditForm.GalleryTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onChange={handleChange} value={formData.title} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="galleryEditForm.GalleryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleChange} value={data.data.description} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
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
      <div>
        <h2>Galleries</h2>
        <GalleryList />
        {/* <S3Uploader /> */}
        {/* <GetFile prefix={'daire-hardesty-logo'} /> */}
        {/* <BucketList /> */}
      </div>
    );
  }
}

export default Galleries;