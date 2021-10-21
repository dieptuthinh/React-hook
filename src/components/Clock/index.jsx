import React, { useEffect, useState } from 'react';

Clock.propTypes = {
    
};
function formatDate(date) {
    if (!date) return '';
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`

}

function Clock() {
    const [timeString, setTimeString] = useState('');
    const [showClock, setShowClock] = useState(true)
 

    useEffect(() => {
        //sau moi giay lam mot viec gi day
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);

            setTimeString(newTimeString);
        }, 1000);
        return () => {
          //clean up
          clearInterval(clockInterval) 
        };
    }, [])
    return (
        <div>
            <p>{showClock && timeString}</p>
            <button onClick={() => setShowClock(false)}>Hide clock</button>
            <button onClick={() => setShowClock(true)}>Show clock</button>
        </div>
    );
}

export default Clock;