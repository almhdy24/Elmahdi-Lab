const Footer = () => {
	let year = new Date().getFullYear();

	return (
		<footer className="bg-dark text-white mt-5 p-4">
			<div className="container text-center p-2">
				<p className="mb-0">
					<strong>Dr. Elmahdi Lab System</strong> &copy; {year}
				</p>
				<p className="mb-0">
					Powered by{' '}
					<strong>
						{' '}
						<a
							href="https://almhdy.sd/systems/Elmahdi-Lab"
							className="text-white"
						>
							Elmahdi Technology{' '}
						</a>
					</strong>
				</p>
				<p className="mt-2">
					<a
						className="text-white"
						href="#"
					>
						Manage Tests <small className="badge danger">soon</small>
					</a>
					<span className="mx-2"> | </span>
					<a
						className="text-white"
						href="#"
					>
						Renew License <small className="badge">soon</small>
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
