import React, { useState, useEffect } from 'react';
import NewSession from './NewSession.jsx';
import Session from './Session.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Sessions = () => {
	const [hasSession, setHasSession] = useState(
		!!localStorage.getItem('sessions')
	);
	const [showNewSessionModal, setShowNewSessionModal] = useState(false);

	useEffect(() => {
		const handleStorageChange = () => {
			setHasSession(!!localStorage.getItem('sessions')[0]);
		};
		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	const openNewSessionModal = () => {
		setShowNewSessionModal(true);
	};

	const closeNewSessionModal = () => {
		setShowNewSessionModal(false);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					{hasSession ? (
						<Session />
					) : (
						<>
							<Button
								className="m-2 p-2"
								variant="primary"
								onClick={openNewSessionModal}
							>
								Create New Session
							</Button>
							<Modal
								show={showNewSessionModal}
								onHide={closeNewSessionModal}
							>
								<Modal.Header closeButton>
									<Modal.Title>New Session</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<NewSession
										onSessionCreated={() => {
											setHasSession(true);
											closeNewSessionModal();
										}}
									/>
								</Modal.Body>
							</Modal>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Sessions;
