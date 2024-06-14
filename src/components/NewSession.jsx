import { useState } from 'react';
import { nanoid } from 'nanoid';

const NewSession = ({ onSessionCreated }) => {
	const [name, setName] = useState('');
	const [sex, setSex] = useState('Male');
	const [age, setAge] = useState('');
	const currentDate = new Date().toJSON().slice(0, 10);
	const [errors, setErrors] = useState({});

	const updateName = event => {
		setName(event.target.value);
	};

	const updateSex = event => {
		setSex(event.target.value);
	};

	const updateAge = event => {
		setAge(event.target.value);
	};

	const generateRandomId = () => {
		return nanoid(4); // You can adjust the length of the generated ID as per your preference
	};

	const validateForm = () => {
		const errors = {};
		if (name.trim() === '') {
			errors.name = 'Name is required';
		}
		if (age.trim() === '') {
			errors.age = 'Age is required';
		} else if (isNaN(age) || +age <= 0) {
			errors.age = 'Invalid age';
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const newSession = event => {
		event.preventDefault();
		if (!validateForm()) {
			return;
		}

		const session = {
			id: generateRandomId(),
			name,
			age: +age, // Convert age to a number
			sex,
			date: currentDate,
		};

		// Save the session to localStorage
		try {
			let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
			sessions.push(session);
			localStorage.setItem('sessions', JSON.stringify(sessions)); // Save the array of sessions
			onSessionCreated();
		} catch (error) {
			console.error('Error saving session to localStorage:', error);
			// Handle the error, e.g., display a user-friendly message
		}
	};

	return (
		<form
			className="border rounded p-3"
			onSubmit={newSession}
		>
			<h3 className="my-3 m-1 text-center">New Session</h3>
			<div className="row g-3">
				<div className="col-md-6">
					<label className="form-label">Name:</label>
					<input
						type="text"
						className={`form-control ${
							errors.name && 'is-invalid'
						}`}
						value={name}
						onChange={updateName}
					/>
					{errors.name && (
						<div className="invalid-feedback">{errors.name}</div>
					)}
				</div>
				<div className="col-md-6">
					<label className="form-label">Age:</label>
					<input
						type="text"
						className={`form-control ${errors.age && 'is-invalid'}`}
						value={age}
						onChange={updateAge}
					/>
					{errors.age && (
						<div className="invalid-feedback">{errors.age}</div>
					)}
				</div>
			</div>
			<div className="row g-3 mt-3">
				<div className="col-md-6">
					<label className="form-label">Sex:</label>
					<select
						className="form-select"
						value={sex}
						onChange={updateSex}
					>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>
			</div>
			<div className="text-center mt-3">
				<button
					type="submit"
					className="btn btn-primary"
				>
					Save
				</button>
			</div>
		</form>
	);
};

export default NewSession;
