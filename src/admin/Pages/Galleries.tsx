import React, { Component, useState } from 'react';

function Upload() {
  const [file, setFile] = useState(null);
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };
  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

const uploadFile = async () => {
}

class Galleries extends Component {
  render() {
    return (
        <div>
          <h2>Galleries</h2>
        </div>
    );
  }
}

export default Galleries;