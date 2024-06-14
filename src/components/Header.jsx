const Header = () => {
  // Set default values in case of error or missing data in local storage
  const defaultOptions = {
    address: 'Kosti, 39',
    healthCareProvider: 'Al-Shafa Healthcare Center',
  };

  let options;
  try {
    options = JSON.parse(localStorage.getItem('options'))[0] || defaultOptions;
  } catch (error) {
    console.error('Error parsing options from local storage:', error);
    options = defaultOptions;
  }

  const { address, healthCareProvider } = options;

  return (
    <header className="bg-light text-center p-4">
      <h1 className="display-1 font-weight-bold">DR. Elmahdi Lab</h1>
      <h2 className="font-weight-bold">{healthCareProvider}</h2>
      <h3>{address}</h3>
    </header>
  );
};

export default Header;