import React, { Component, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
	const [uploadedFiles, setUploadedFiles] = useState<any>([]);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			setUploadedFiles(acceptedFiles);
			// Call your backend API endpoint to upload files
		},
	});
	return (
		<div {...getRootProps()} className="dropzone">
			<input {...getInputProps()} />
			<p>Drag and drop files here or click to browse.</p>
			{/* <ul>
        {uploadedFiles.map((file: any) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul> */}
		</div>
	);
};

function MediaNew() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Button variant="outline-dark" onClick={handleShow}>New</Button>{' '}
			<Modal show={show} onHide={handleClose} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Upload media</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FileUpload />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

class Media extends Component {
	render() {
		return (
			<>
				<h2>Media</h2>
				<MediaNew />
			</>
		);
	}
}

export default Media;