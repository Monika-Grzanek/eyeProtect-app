import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';

const AppDescription = () => {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
}


const App = () => {
    const [status, setStatus] = useState('off');
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(null);
    
    const formatTime = (time) => {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) seconds = '0' + seconds;
      if (minutes < 10) minutes = '0' + minutes;
      return minutes + ':' + seconds;
    }

    const step = () => {
      setTime((time) => time -1);
        if(time === 0) {
            if(status === 'work') {
                setStatus('rest'),
                setTime(20),
                playBell();
            } else if (status === 'rest') {
                setStatus('work'),
                setTime(1200),
                playBell();
            } 
        }
    }

    const startTimer = () => {
        setStatus('work'),
        setTime(1200),
        setTimer(setInterval(step, 10));
    }

    const stopTimer = () => {
        setTimer(clearInterval(step)),
        setTime(0),
        setStatus('off')
    }

    const closeApp = () => {
        window.close();
    }

    const playBell = () => {
        const bell = new Audio('./sounds/bell.wav');
        bell.play();
    };

    return (
      <div>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">
          {formatTime(time)}
        </div>}
        {(status === 'off') && <button onClick={startTimer} className="btn">Start</button>}
        {(status !== 'off') && <button onClick={stopTimer} className="btn">Stop</button>}
        <button onClick={closeApp} className="btn btn-close">X</button>
      </div>
    )
}


render(<App />, document.querySelector('#app'));