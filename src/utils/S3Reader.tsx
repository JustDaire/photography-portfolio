import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
	region: process.env.REACT_APP_REGION,
});
const s3 = new AWS.S3();

const params = {
	Bucket: 'daire-photo',
	Delimiter: '',
	Prefix: '',
};

export function GetFile(prefix: any) {
	console.log('Prefix:', prefix.prefix);
	// params.Prefix = JSON.stringify(prefix.prefix);
	const [listFiles, setListFiles] = useState<any>([]);

	useEffect(() => {
		s3.listObjectsV2(params, (err, data) => {
			if (err) {
				console.log(err, err.stack);
			} else {
				setListFiles(data.Contents);
				console.log('Data:', data.Contents);
			}
		});
	}, []);
	return (
		<>
			{listFiles &&
				listFiles.map((name: { Key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
					<p key={index}>
						{name.Key}
					</p>
				))}</>
	);
}

export function GetFiles() {
	const [listFiles, setListFiles] = useState<any>([]);

	useEffect(() => {
		s3.listObjectsV2(params, (err, data) => {
			if (err) {
				console.log(err, err.stack);
			} else {
				setListFiles(data.Contents);
				console.log('Data:', data.Contents);

				//Data map
				data.Contents && data.Contents.map((name, index) => (
					console.log('Name:', name.Key)
				));
			}
		});
	}, []);

	return (
		<div className='card'>
			<div className='card-header'>SampleCompany Files</div>
			<ul className='list-group'>
				{listFiles &&
					listFiles.map((name: { Key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
						<li className='list-group-item' key={index}>
							{name.Key}
						</li>
					))}
			</ul>
		</div>
	);
}

const BucketList = () => {
	const [listFiles, setListFiles] = useState<any>([]);

	useEffect(() => {
		s3.listObjectsV2(params, (err, data) => {
			if (err) {
				console.log(err, err.stack);
			} else {
				setListFiles(data.Contents);
				console.log('Data:', data.Contents);

				//Data map
				data.Contents && data.Contents.map((name, index) => (
					console.log('Name:', name.Key)
				));
			}
		});
	}, []);

	return (
		<div className='card'>
			<div className='card-header'>SampleCompany Files</div>
			<ul className='list-group'>
				{listFiles &&
					listFiles.map((name: { Key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
						<li className='list-group-item' key={index}>
							{name.Key}
						</li>
					))}
			</ul>
		</div>
	);
};

// GetFiles;

export default GetFiles;