import React, { Component, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Spinner from "react-bootstrap/esm/Spinner";
import { useDropzone } from 'react-dropzone';
import { GetFiles, GetFilesTest, S3UploadFiles, S3Uploader, S3UploaderTest } from '../../utils/S3Bridge'
import Image from 'react-bootstrap/Image';

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
							<Image src={url + item.Key} className={'img-fluid'} fluid thumbnail />
						</div>
					</div>
				))}
			</div>
		</>
	);
}

function MediaNew() {
	const [show, setShow] = useState(false);
	const [isLoading, setLoading] = useState(false);

	// useEffect(() => {
	// 	function simulateNetworkRequest() {
	// 		return new Promise((resolve) => setTimeout(resolve, 5000));
	// 	}

	// 	if (isLoading) {
	// 		simulateNetworkRequest().then(() => {
	// 			setLoading(false);
	// 		});
	// 	}
	// }, [isLoading]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// const handleClick = () => setLoading(true);

	const [uploadedFiles, setUploadedFiles] = useState<any>([]);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			console.log('File:', acceptedFiles);
			setUploadedFiles(acceptedFiles);
			// Call your backend API endpoint to upload files
		}
	});

	const UploadFiles = async () => {
		setLoading(true);
		// handleClick();
		// const { loading, progress } = S3UploadFiles(uploadedFiles);
		console.log('uploadedFiles:', uploadedFiles);

		const result = await S3UploaderTest(uploadedFiles[0]);
		console.log('result:', result);

		if (result == 1) {
			console.log('Upload succeeded');
			handleClose();
		} else if (result == 2) {

		} else {
			console.log('result:', result);
		}

		// if (loading) {
		// 	return <p>Loading... </p>
		// } else {
		// 	console.log('Files:', progress);
		// }
		// if (!isLoading) {
		// 	setTimeout(() => {
		// 		console.log('Upload succeeded');
		// 		handleClose();
		// 	}, 3000);
		// }
	};
	return (
		<>
			<Button variant="outline-dark" onClick={handleShow}>New</Button>{' '}
			<Modal show={show} onHide={handleClose} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Upload media</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<S3Uploader />
					<div {...getRootProps({
						onClick: event => console.log(event),
						role: 'button',
						'aria-label': 'drag and drop area'
					})} className="dropzone">
						<input {...getInputProps()} />
						<p>{uploadedFiles.length > 0 ? uploadedFiles[0].name : "Drag and drop files here or click to browse."}</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary"
						disabled={isLoading || uploadedFiles.length == 0}
						onClick={UploadFiles}>
						{isLoading ?
							<>
								<Spinner animation="border" role="status" size="sm">
									<span className="visually-hidden">Loading...</span>
								</Spinner> Uploading...
							</> : 'Upload'}
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