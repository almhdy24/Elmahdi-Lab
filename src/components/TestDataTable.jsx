import React, { useState } from "react";
import PropTypes from "prop-types";
import { useToaster ,toast} from 'react-hot-toast';

const TestDataTable = ({ title }) => {
  const [headData, setHeadData] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const toaster = useToaster();

  const handleInputChange = (event, index, isHead) => {
    const newData = isHead ? [...headData] : [...bodyData];
    newData[index] = event.target.value;

    if (isHead) {
      setHeadData(newData);
    } else {
      setBodyData(newData);
    }
  };

  const handleSave = () => {
    const tableData = {
      head: headData,
      body: bodyData,
    };

    console.log(tableData); // You can modify this line to save the tableData wherever you need

    // Reset the data for the next table
    setHeadData([]);
    setBodyData([]);

    // Show a confirmation message using react-hot-toast
    toaster.success("Table data saved!");
  };

  const renderTable = () => {
    return (
      <table className="table">
        {/* ... */}
      </table>
    );
  };

  return (
    <div>
      <h2>{title}</h2>
      {renderTable()}
      <button onClick={handleSave}>Save Table Data</button>
    </div>
  );
};

TestDataTable.propTypes = {
  title: PropTypes.string,
};

TestDataTable.defaultProps = {
  title: "Table Title",
};

export default TestDataTable;