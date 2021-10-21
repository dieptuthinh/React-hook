import React from 'react';
import useClock from '../hooks/useClock'

ClockHook.propTypes = {

};


function ClockHook() {
    const { timeString } = useClock();

    return (
        <div>
            <p>Use custom hook: {timeString }</p>
        </div>
    );
}

export default ClockHook;