const SessionTable = ({ data, onSessionDelete }) => {
	const { id, name, age, date, sex } = data[0] || false;
	return (
		<div className="table-responsive">
			<table className="table table-striped table-bordered">
				<thead className="table-dark">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Age</th>
						<th>Sex</th>
						<th>Date</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>{id}</td>
						<td>{name}</td>
						<td>{age}</td>
						<td>{sex}</td>
						<td>{date}</td>
						<td>
							<button
								className="btn btn-sm btn-danger"
								onClick={() => onSessionDelete(data.id)}
							>
								Cancel
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SessionTable;
