import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const RenderTestComponent = ({ test }) => {
	if (!test) {
		return <div className="alert alert-info">No Test is selected !</div>;
	}

	const { type, name, value } = test;

	const [inputValues, setInputValues] = useState({});

	useEffect(() => {
		const testsFromLocalStorage = JSON.parse(localStorage.getItem('tests'));
		if (testsFromLocalStorage && testsFromLocalStorage[name]) {
			setInputValues(testsFromLocalStorage[name]);
		}
	}, [name]);

	const handleInputChange = (e, columnName) => {
		const updatedTests = JSON.parse(localStorage.getItem('tests')) || {};

		if (!updatedTests[name]) {
			updatedTests[name] = {};
		}

		if (type === 'table' || type === 'input') {
			updatedTests[name][columnName] = e.target.value;
		} else if (type === 'select') {
			updatedTests[name][columnName] = e.value;
		}

		// Check if all values are null and delete the test if they are
		const allValuesNull = Object.values(updatedTests[name]).every(
			value => value === null || value === undefined
		);
		if (allValuesNull) {
			delete updatedTests[name];
		}

		localStorage.setItem('tests', JSON.stringify(updatedTests));
		setInputValues(updatedTests[name]);
	};
	switch (type) {
		case 'table':
			const tableRows = value.map((row, index) => (
				<tr key={index}>
					<td>{row}</td>
					<td>
						<input
							type="text"
							className="form-control"
							value={inputValues[row] || ''}
							onChange={e => handleInputChange(e, row)}
							placeholder={`Enter value for ${row}`}
						/>
					</td>
				</tr>
			));

			return (
				<>
					<label>{name}</label>
					<table className="table table-bordered p-2">
						<thead className="table-dark">
							<tr>
								<th>Test Parm</th>
								<th>Test Value</th>
							</tr>
						</thead>
						<tbody>{tableRows}</tbody>
					</table>
				</>
			);
		case 'select':
			test.options = test.value.map(item => {
				return {
					label: item.toUpperCase(),
					value: item,
				};
			});
			return (
				<div className="form-group">
					<label>{name}</label>
					<Select
						onChange={e => handleInputChange(e, 'selectedOption')}
						options={test.options}
						value={test.options.find(
							option =>
								option.value === inputValues.selectedOption
						)}
					/>
				</div>
			);
		case 'input':
			return (
				<div className="form-group">
					<label>{name}</label>
					<input
						type="text"
						value={inputValues.inputValue || ''}
						onChange={e => handleInputChange(e, 'inputValue')}
						className="form-control"
						placeholder={`Enter value for ${name}`}
					/>
				</div>
			);
		default:
			return null;
	}
};

export default RenderTestComponent;
