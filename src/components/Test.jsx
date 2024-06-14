import { Button, Modal, Card } from 'react-bootstrap';
//import TestsData from './TestsData.jsx';
import { useState } from 'react';
import RenderTestComponent from './RenderTestComponent.jsx';

const Test = ({ test }) => {
	let TestsData = JSON.parse(localStorage.getItem('tests')) || [];
	const [tests, setTests] = useState(TestsData); // Assuming TestsData is the initial test data
	const [showModal, setShowModal] = useState(false);
	const [testToDelete, setTestToDelete] = useState(null);

	const handleShowModal = test => {
		setShowModal(true);
		setTestToDelete(test);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setTestToDelete(null);
	};

	const deleteTest = () => {
		const updatedTests = { ...tests };
		delete updatedTests[testToDelete];
		//const updatedTests = Object.entries(tests).filter(test => test !== testToDelete);
		setTests(updatedTests);
		localStorage.setItem('tests', JSON.stringify(updatedTests));
		console.log(updatedTests);
		handleCloseModal();
	};

	return (
		<Card className="m-2">
			<Card.Body>
				<RenderTestComponent test={test} />
				{test ? (
					<div className="alert alert-info p-2 mt-3 mb-2">
						<h6 className="">Info about the test :</h6>
						<p>{test.extra}</p>
					</div>
				) : (
					''
				)}
			</Card.Body>
			<Modal
				show={showModal}
				onHide={handleCloseModal}
			>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Delete</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete the test?
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleCloseModal}
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={deleteTest}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</Card>
	);
};

export default Test;
