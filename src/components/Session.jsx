import React, { useState, useEffect } from 'react';
import Test from './Test.jsx';
import TestsData from './TestsData.jsx';
import SessionTable from './SessionTable.jsx';
import Select from 'react-select';
import LivePreview from './LivePreview.jsx';
import Printer from './Printer.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Session = () => {
	const [selectedTest, setSelectedTest] = useState(null);
	const [sessions, setSessions] = useState([]);
	const [testsData, setTestsData] = useState([]);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [ShowDeleteAllTestsConfirmation, setShowDeleteAllTestsConfirmation] =
		useState(false);

	useEffect(() => {
		try {
			const storedSessions =
				JSON.parse(localStorage.getItem('sessions')) || [];
			const storedTestsData =
				JSON.parse(localStorage.getItem('tests')) || [];
			setSessions(storedSessions);
			setTestsData(storedTestsData);
		} catch (error) {
			console.error('Error accessing localStorage:', error);
			// Handle the error or provide feedback to the user, e.g., displaying a notification
		}
	}, []);

	const deleteSession = () => {
		localStorage.removeItem('sessions');
		localStorage.removeItem('tests');
		setSessions([]);
		setTestsData([]);
		setShowDeleteConfirmation(false); // Close the confirmation modal after deletion
		location.reload();
	};

	const options = TestsData.map(test => ({
		value: test.name.toLowerCase(),
		label: test.name,
	}));

	const updateTest = selectedOption => {
		const selectedTest = TestsData.find(
			test =>
				test.name.toLowerCase() === selectedOption.value.toLowerCase()
		);
		setSelectedTest(selectedTest);
	};
	const startOver = () => {
		setShowDeleteAllTestsConfirmation(true);
	};
	const deleteAllTests = () => {
		localStorage.setItem('tests', '{}');
		//	localStorage.removeItem('tests');
		setShowDeleteAllTestsConfirmation(false);
        setSelectedTest("");
	};
	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-6">
					<h2>Current session</h2>
					<SessionTable
						data={sessions}
						onSessionDelete={() => setShowDeleteConfirmation(true)}
					/>
					<Select
						options={options}
						onChange={updateTest}
						placeholder="Select a test"
						className="mt-3"
					/>
					<Test
						className="m-2 p-2"
						test={selectedTest}
					/>
					<Modal
						show={showDeleteConfirmation}
						onHide={() => setShowDeleteConfirmation(false)}
					>
						<Modal.Header closeButton>
							<Modal.Title>Confirm Deletion</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Are you sure you want to delete the session?
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => setShowDeleteConfirmation(false)}
							>
								Cancel
							</Button>
							<Button
								variant="danger"
								onClick={deleteSession}
							>
								Delete
							</Button>
						</Modal.Footer>
					</Modal>
					<Modal
						show={ShowDeleteAllTestsConfirmation}
						onHide={() => setShowDeleteAllTestsConfirmation(false)}
					>
						<Modal.Header closeButton>
							<Modal.Title>Confirm Deletion</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Are you sure you want to delete all current
							tests,this can not be undone?
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() =>
									setShowDeleteAllTestsConfirmation(false)
								}
							>
								Cancel
							</Button>
							<Button
								variant="danger"
								onClick={deleteAllTests}
							>
								Delete
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<div className="col-md-6">
					<h2>Live Preview</h2>
					<LivePreview />
				</div>
			</div>
			<Printer
				patientInfo={sessions}
				testData={testsData}
			/>
			<Button
				onClick={startOver}
				className="mb-3 mt-2 "
				variant="danger"
			>
				Start over (Delete All Tests)
			</Button>
		</div>
	);
};

export default Session;
