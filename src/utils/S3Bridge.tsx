import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const S3_BUCKET = "daire-photo";

AWS.config.update({
	accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
	// region: process.env.REACT_APP_REGION,
});

const myBucket = new AWS.S3({
	params: { Bucket: S3_BUCKET },
	// region: process.env.REACT_APP_REGION,
})

const s3 = new AWS.S3();

const params = {
	Bucket: 'daire-photo',
	Delimiter: '',
	Prefix: '',
};

export function GetFilesTest() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		setLoading(true);
		s3.listObjectsV2(params, (err, data) => {
			if (err) {
				console.log(err, err.stack);
				setLoading(false);
			} else {
				setData(data.Contents);
				console.log('Data:', data.Contents);
				setLoading(false);
			}
		});
		// fetch("https://randomuser.me/api/?results=10")
		//   .then((response) => response.json())
		//   .then((responseJson) => {
		//     setData(responseJson.results);
		//     setLoading(false);
		//   })
		//   .catch((error) => {
		//     console.error(error);
		//     setLoading(false);
		//   });
	}, []);

	const url = 'https://' + params.Bucket + '.s3.eu-west-1.amazonaws.com/';

	return { loading, data, url };
}

export function GetFiles() {
	const [loading, setLoading] = useState(false);
	const [listFiles, setListFiles] = useState<any>([]);

	useEffect(() => {
		s3.listObjectsV2(params, (err, data) => {
			if (err) {
				console.log(err, err.stack);
			} else {
				setListFiles(data.Contents);
				console.log('Data:', data.Contents);

				//Data map
				// data.Contents && data.Contents.map((name, index) => (
				// 	console.log('Name:', name.Key)
				// ));
			}
		});
	}, []);

	return listFiles;

	// return (
	// 	<div className='card'>
	// 		<div className='card-header'>SampleCompany Files</div>
	// 		<ul className='list-group'>
	// 			{listFiles &&
	// 				listFiles.map((name: { Key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
	// 					<li className='list-group-item' key={index}>
	// 						{name.Key}
	// 					</li>
	// 				))}
	// 		</ul>
	// 	</div>
	// );
}



export function S3UploadFiles(file: any) {
	const [loading, setLoading] = useState(false);
	// Progress
	const [progress, setProgress] = useState(0);
	// File handling
	const [selectedFile, setSelectedFile] = useState(null);
	setSelectedFile(file);

	const params = {
		ACL: 'public-read',
		Body: file,
		Bucket: S3_BUCKET,
		Key: file.name
	};
	s3.putObject(params, (err, data) => {
		if (err) {
			console.log('Errrr:', err, err.stack);
			setLoading(false);
		} else {
			console.log('Data:', data);
			setLoading(false);
		}
	}).on('httpUploadProgress', (evt) => {
		console.log(evt);
		setProgress(Math.round((evt.loaded / evt.total) * 100))
	})
		.send((err) => {
			if (err) console.log('Error:', err)
		});

	// myBucket.putObject(params)
	// 	.on('httpUploadProgress', (evt) => {
	// 		console.log(evt);
	// 		setProgress(Math.round((evt.loaded / evt.total) * 100))
	// 	})
	// 	.send((err) => {
	// 		if (err) console.log('Error:', err)
	// 	})
	return { loading, progress };
}

export function S3Uploader() {
	// Progress
	const [progress, setProgress] = useState(0);
	// File handling
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileInput = (e: any) => {
		setSelectedFile(e.target.files[0]);
	}

	const uploadFile = async (file: any) => {
		const today = new Date();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		const date = today.getDate();
		const currentDate = year + "_" + month + "_" + date + "_";

		const params = {
			ACL: 'public-read',
			Body: file,
			Bucket: S3_BUCKET,
			Key: currentDate + file.name,
			maxRetries: 5
		};
		console.log('params:', params)
		console.log('AWS.config:', AWS.config)


		// Upload the file to S3
		myBucket.upload(params, (err: any, data: any) => {
			if (err) {
				console.error("Error uploading file:", err);
			} else {
				console.log("File uploaded successfully:", data);

				//  Console.log
				//  {
				//    bucket: "myBucket",
				//    key: "directoryName/test-image.jpg",
				//    location: "https://myBucket.s3.amazonaws.com/directoryName/test-file.jpg"
				//  }
			}
		})
		// .on('httpUploadProgress', (evt) => {
		// 	console.log(evt);
		// 	setProgress(Math.round((evt.loaded / evt.total) * 100))
		// })
		// .send((err: any) => {
		// 	if (err) console.log('Error:', err)
		// })
	}
	return (
		<div>
			<div>Native SDK File Upload Progress is {progress}%</div>
			<input type="file" onChange={handleFileInput} />
			<button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
		</div>
	);
}