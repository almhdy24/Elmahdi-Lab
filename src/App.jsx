import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Sessions from "./components/Sessions.jsx";
import Footer from "./components/Footer.jsx";
import SetUp from "./components/SetUp.jsx";
import Timer from "./components/Timer.jsx";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [timerComplete, setTimerComplete] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const deviceID = localStorage.getItem("deviceID") || undefined;

    const handleTimerComplete = () => {
        if (!deviceID) {
            const uniqueDeviceID = generateUniqueID(); // Function to generate a unique device ID
            localStorage.setItem("deviceID", uniqueDeviceID);
        }
        setTimerComplete(true);
    };
    useEffect(() => {
        if (deviceID) {
          if (!timerComplete) {
            
            // setTimerComplete(true);
          }
        }
        // Simulate async data retrieval from localStorage
        setTimeout(() => {
            const storedOptions =
                JSON.parse(localStorage.getItem("options")) || [];
            setOptions(storedOptions);
            setLoading(false);
        }, 150);
    }, []); // Run once on component mount
    const generateUniqueID = () => {
        // Function to generate a unique ID
        return Math.random().toString(36).substr(2, 9);
    };
    return (
        <>
            <Header />
            <Timer onTimerComplete={handleTimerComplete} />
            {loading ? (
                <p>Loading...</p>
            ) : timerComplete ? (
                <div className='container alert alert-info text-center m-2 text-lg'>
                    <p>
                        Please purchase the Full version to continue using the
                        application.
                    </p>
                </div>
            ) : (
                <>
                    {options.length > 0 ? <Sessions /> : null}
                    {options.length === 0 ? <SetUp /> : null}
                </>
            )}
            <Toaster />
            <Footer />
        </>
    );
}

export default App;
