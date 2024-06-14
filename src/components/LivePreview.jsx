import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const LivePreview = () => {
	const [tests, setTests] = useState(
		JSON.parse(localStorage.getItem('tests')) || {}
	);

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedTests = JSON.parse(localStorage.getItem('tests'));
			if (updatedTests) {
				setTests(updatedTests);
			}
		}, 1000); // Polling local storage every 1 second

		return () => clearInterval(interval);
	}, []);

	const data = JSON.parse(localStorage.getItem('sessions'));
	if (!data) {
		return;
	}

	const { address, healthCareProvider } = JSON.parse(
		localStorage.getItem('options')
	)[0] || {
		address: 'kosti,39',
		healthCareProvider: 'Al-Shafa Healthcare Center',
	};
	const { id, name, age, date, sex } = data[0];
	return (
		<div className="container live-preview m-2 border p-2">
			<h2 className="text-center">{healthCareProvider}</h2>
			<h5 className="text-center">{address}</h5>
			<h5 className="text-center">Medical Lab Result</h5>
			<h6>Patient Information:</h6>
			<Table
				striped
				bordered
				hover
			>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Age</th>
						<th>Sex</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{id}</td>
						<td>{name}</td>
						<td>{age}</td>
						<td>{sex}</td>
						<td>{date}</td>
					</tr>
				</tbody>
			</Table>

			{Object.entries(tests).map(([testName, test]) => {
				if (test.selectedOption || test.inputValue) {
					return (
						<div key={testName}>
							<table className="table ">
								<thead className="">
									<tr>
										<th>Test Name </th>
										<th>Test Result </th>
									</tr>
								</thead>

								<tbody>
									<tr>
										<td>{testName}</td>

										<td>
											{test.selectedOption ||
												test.inputValue}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					);
				}

				return (
					<div>
						<table className="table  caption-top">
							<caption>{testName}</caption>
							<thead className="">
								<tr>
									<th>Test Parm </th>
									<th>Test Result </th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(test).map(
									([key, value], index) => {
										return (
											<tr key={index}>
												<td>{key}</td>
												<td>{value}</td>
											</tr>
										);
									}
								)}
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
};

export default LivePreview;
