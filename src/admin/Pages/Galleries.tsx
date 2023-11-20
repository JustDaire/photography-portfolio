import React, { Component } from 'react';
import S3Uploader from '../../utils/S3Uploader';
// import BucketList from '../../utils/S3Reader';
import GetFile from '../../utils/S3Reader';

class Galleries extends Component {
  render() {
    return (
      <div>
        <h2>Galleries</h2>
        <S3Uploader />
        <GetFile prefix={'daire-hardesty-logo'} />
        {/* <BucketList /> */}
      </div>
    );
  }
}

export default Galleries;