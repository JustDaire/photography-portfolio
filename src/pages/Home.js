import React, { Component, useEffect } from 'react';
import Image from 'react-bootstrap/Image';

function Home() {
  useEffect(() => {
    document.body.classList.add('no-scroll');


    return () => {
      // removing classes from body element
      // when the component unmounts
      document.body.classList.remove('no-scroll');
    }
  }, []);
  return (
    <div className='slider-image'>
      {/* <img
              alt="Daire Hardesty"
              src="/DCS2416.webp"
              className="slider-image"
              fluid
            /> */}
      {/* <Image src="/DCS2416.webp"  style={{ width: "500%", height: "600%" }}  className="slider-image" fluid /> */}
    </div>
  );
}

export default Home;