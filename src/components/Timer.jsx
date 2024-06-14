import { useState, useEffect } from "react";

const Timer = ({ onTimerComplete }) => {
    const [elapsedTime, setElapsedTime] = useState(() => {
        const storedElapsedTime = localStorage.getItem("elapsedTime");
        return storedElapsedTime ? parseInt(storedElapsedTime) : 0;
    });

    const [timerComplete, setTimerComplete] = useState(false);
    const deviceID = localStorage.getItem("deviceID");

    useEffect(() => {
        if (deviceID) {
            setTimerComplete(true);
        }

        const timerLimit = 6000; // 10 minutes in seconds
        let remainingTime = timerLimit - elapsedTime;
        let timer = setTimeout(() => {
            setTimerComplete(true);
            onTimerComplete(); // Notify parent component of timer completion
        }, remainingTime * 1000);

        return () => clearTimeout(timer);
    }, [onTimerComplete, elapsedTime, deviceID]);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(prevElapsedTime => {
                const updatedElapsedTime = prevElapsedTime + 1;
                localStorage.setItem("elapsedTime", updatedElapsedTime);
                return updatedElapsedTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {timerComplete ? (
                <></>
            ) : (
                <div className='timer-container'>
                    <span className='timer-label'>Time Elapsed:</span>
                    <span className='timer'>{elapsedTime} seconds</span>
                </div>
            )}
        </>
    );
};

export default Timer;
