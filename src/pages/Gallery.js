import React, { Component } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const items = Array.from({ length: 8 }).map((_, index) => (
  <article class="grid-project js-grid-project size-1">
    <a>
      <img
        key={index}
        src={`https://picsum.photos/${Math.floor(Math.random() * (300 - 200 + 1) + 300)}/${Math.floor(Math.random() * (300 - 200 + 1) + 200)}`}
        style={{ width: "100%", borderRadius: "0" }}      />
    </a>
    <h2 class="grid-project__overlay radial-overlay">
      <a class="grid-project__inner">
        <div class="entry-title">Portraits</div>
      </a>
    </h2>
  </article>
));

class Gallery extends Component {

  render() {
    return (
      <div>
        <h2>Gallery</h2>
        <div className="App">

          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 2, 500: 4, 700: 5, 900: 5 }}
          >
            <Masonry gutter="10px">
              {items}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    );
  }
}

export default Gallery;