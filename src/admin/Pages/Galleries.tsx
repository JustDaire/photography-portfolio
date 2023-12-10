import React, { Component, useEffect, useState } from 'react';
import S3Uploader from '../../utils/S3Uploader';
// import BucketList from '../../utils/S3Reader';
import GetFile from '../../utils/S3Reader';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
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
        <div>
          {galleries.map(gallery => (
            <Card className='gallery-image' key={gallery.id} style={{ width: '18rem' }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              >
              {isHovering && (
                <span className='card-edit'>Edit</span>
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