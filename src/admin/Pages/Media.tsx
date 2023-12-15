import React, { Component, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
	const [uploadedFiles, setUploadedFiles] = useState<any>([]);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			console.log('File:', acceptedFiles);
			setUploadedFiles(acceptedFiles);
			console.log('uploadedFiles:', uploadedFiles);
			// Call your backend API endpoint to upload files
		},
	});
	return (
		<div {...getRootProps({
			onClick: event => console.log(event),
			role: 'button',
			'aria-label': 'drag and drop area'
		})} className="dropzone">
			<input {...getInputProps()} />
			<p>Drag and drop files here or click to browse.</p>
			<ul>
				{uploadedFiles.map((file: any) => (
					<li key={file.name}>{file.name}</li>
				))}
			</ul>
		</div>
	);
};

function MediaView() {
	// const { loading, data } = UseFetchData();
	// GetFiles();
	// const response = GetFiles();
	const { loading, data, url } = GetFilesTest();
	// console.log(response)

	// getFeatures().then(x => {
	// 	console.log('Files:', x);
	// 	// do something else
	// });

	if (loading) {
		return <p>Loading... </p>
	} else {
		console.log('Files:', data);
	}

	return (
		<>
			<h2>Media</h2>

			<div className="row no-gutters">
				{data.map((item: any, index: number) => (
					<div className="col-sm-4" key={index}>
					<div className="media-thumbnail">
						<Image src={url + item.Key} className={'img-fluid'} fluid thumbnail/>
					</div>
					</div>
				))}
			</div>
		</>
	);
}

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
				<MediaView />
			</>
		);
	}
}

export default Media;