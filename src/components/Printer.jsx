import app from "../assets/app.css";

const Printer = (patientInfo, testData) => {
    const handlePrint = () => {
        // Generate the content for the PDF
        const pdfContent = generatePdfContent();

        // Create a new window and open the PDF content
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
            alert("Please allow pop-ups for this website to enable printing.");
            return;
        }
        printWindow.document.open();
        printWindow.document.write(pdfContent);
        printWindow.document.close();

        // Wait for the PDF content to be fully loaded before printing
        printWindow.addEventListener("load", () => {
            // Print the PDF
            printWindow.print();

            // Close the popup window after printing
            setTimeout(() => {
                printWindow.close();
            }, 10000);
        });
    };

    const generatePdfContent = () => {
        const data = JSON.parse(localStorage.getItem("sessions"));
        if (!data) {
            return;
        }

        const { address, healthCareProvider } = JSON.parse(
            localStorage.getItem("options")
        )[0] || {
            address: "kosti,39",
            healthCareProvider: "Al-Shafa Healthcare Center"
        };
        const { id, name, age, date, sex } = data[0];
        const tests = Object.entries(JSON.parse(localStorage.getItem("tests")));

        let content = `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lab Result</title>
  <style>
  ${app}
  </style>
  </head>
  <body>
    <div class="container   py-2 px-3 mt-3 mb-2 m-3">
                <h2 class="text-center">${healthCareProvider}</h2>
                <h3 class="text-center">${address}</h3>
                <h3 class="text-center">Lab Result</h3>
                <h4>Pt Info : </h4>
                <table class="table table-bordered ">
                    <thead class="table">
                        <tr>
                            <th>ID</th>
                            <th>Name </th>
                            <th>Age </th>
                            <th>Sex</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>${age}</td>
                            <td>${sex}</td>
                            <td>${date}</td>
                        </tr>
                    </tbody>
                </table>
                
                `;
        tests.map(([testName, test]) => {
            if (test.selectedOption || test.inputValue) {
                content += `<div>
                                <table class="table table-bordered">
                                    <thead class="">
                                        <tr>
                                            <th>Test Name </th>
                                            <th>Test Result </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>${testName}</td>

                                            <td>
                                                ${
                                                    test.selectedOption ||
                                                    test.inputValue
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            
                            `;
            } else {
                content += `
                            <div>
                            <table class="table  caption-top table-bordered">
                                <caption>${testName}</caption>
                                <thead className="">
                                    <tr>
                                        <th>Test Parm </th>
                                        <th>Test Result </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${Object.entries(test).map(
                                        ([key, value], index) => {
                                            return `
                                                <tr key=${index}>
                                                    <td>${key}</td>
                                                    <td>${value}</td>
                                                </tr>
                                            `;
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
    `;
            }
        });

        return content;
    };

    return (
        <div>
            <button onClick={handlePrint} className='btn btn-success'>
                Print as PDF
            </button>
        </div>
    );
};

export default Printer;
