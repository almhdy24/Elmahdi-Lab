import React, { useState, useEffect } from 'react';
import { useToaster, toast } from 'react-hot-toast';

const SetUp = () => {
	const [address, setAddress] = useState('');
	const [healthCareProvider, setHealthCareProvider] = useState('');
	const [error, setError] = useState('');
	const [isSaving, setIsSaving] = useState(false);
	const toaster = useToaster();

	const updateAddress = event => {
		setAddress(event.target.value);
	};

	const updateHealthCareProvider = event => {
		setHealthCareProvider(event.target.value);
	};

	const saveData = event => {
		event.preventDefault(); // Prevent form submission
		if (!address || !healthCareProvider) {
			setError(
				'Please provide both address and healthcare provider details before saving.'
			);
			toast.error(
				'Please provide both address and healthcare provider details before saving.'
			);
			return;
		}
		if (address && healthCareProvider && !isSaving) {
			setError('');
			setIsSaving(true);
			try {
				setTimeout(() => {
					localStorage.setItem(
						'options',
						JSON.stringify([{ address, healthCareProvider }])
					);
					setIsSaving(false);
					toast.success("Data saved successfully. You're all set!");
					window.location.reload();
				}, 250);
			} catch (error) {
				setError('Error saving data. Please try again.');
				toast.error('Error saving data. Please try again');
				setIsSaving(false);
			}
		}
	};
	function validateAddress() {
		if (address.trim() === '') {
			setError('Address is required');
		} else {
			setError('');
		}
	}

	function validateHealthCareProvider() {
		if (healthCareProvider.trim() === '') {
			setError('Health Care Provider is required');
		} else {
			setError('');
		}
	}

	return (
		<div className="container mt-2 p-2">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<form
						className="border rounded"
						onSubmit={saveData}
					>
						<h3 className="text-center mt-3 font-weight-bold">
							Setup
						</h3>
						<div className="alert alert-primary" role="alert" style={{ margin: '20px', padding: '10px' }}>
                    Welcome to our demo application! This demo will last for 10 minutes only. Enjoy exploring!
                </div>
						<div className="row g-3 p-3">
							<div className="col-12">
								<label className="form-label">
									Health Care Provider:
								</label>
								<input
									type="text"
									className="form-control"
									value={healthCareProvider}
									onChange={updateHealthCareProvider}
									onBlur={validateHealthCareProvider}
								/>
							</div>
							<div className="col-12">
								<label className="form-label">Address:</label>
								<input
									type="text"
									className="form-control"
									value={address}
									onChange={updateAddress}
									onBlur={validateAddress}
								/>
							</div>
							<div className="col-12">
								<button
									type="submit"
									className="btn btn-primary mt-3"
								>
									SetUp
								</button>
							</div>
							{isSaving && (
								<div className="text-center mt-3">
									<div
										className="spinner-border text-primary"
										role="status"
									>
										<span className="visually-hidden">
											Loading...
										</span>
									</div>
									<p>Saving...</p>
								</div>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SetUp;
