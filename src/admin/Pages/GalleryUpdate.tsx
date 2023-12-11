import React from "react";
import { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

class GalleryUpdate extends Component {
	render() {
		return (
			<>
				<Button variant="primary">
					<Link
						className="nav-link d-flex align-items-center gap-2 active"
						to={'../'}
					>
						Back
					</Link>
					Back
				</Button>
				<h2>Edit Gallery</h2>
			</>
		);
	}
}

export default GalleryUpdate;