

const App = () => {

    const [breakLength, setBreak] = React.useState(5)
    const [sessionLength, setSession] = React.useState(25)
    const [startMins, setMins] = React.useState(1500) 
    const [timer, setTimer] = React.useState('inactive')
    const [onBreak, setOnBreak] = React.useState(false)
    const [timerLabel, setLabel] = React.useState('Round')

    

    const activateTimer = () => {
        timer === 'inactive' ? setTimer('active') : setTimer('inactive');
        console.log('click')
    }

    const resetTimer = () => {
        setMins(1500)
        setTimer('inactive')
        setOnBreak(false)
        setBreak(5)
        setSession(25)
        setLabel('Round')
        document.getElementById('beep').load()
    }

    const incBreak = () => {
        if (breakLength < 60 && timer === 'inactive') {
            setBreak(breakLength + 1)
        }
    }
    const decBreak = () => {
        if (breakLength > 1 && timer === 'inactive') {
            setBreak(breakLength - 1)
        }
        
    }
    const incSession = () => {
        if (sessionLength < 60 && timer === 'inactive')  {
            setSession(sessionLength + 1)
            setMins((sessionLength + 1) * 60)
        } 
    }
    const decSession = () => {
        if (sessionLength > 1 && timer === 'inactive') {
            setSession(sessionLength - 1)
            setMins((sessionLength - 1) * 60)
        }
    }
    const playAudio = () => {
        document.getElementById('beep').play()
    }

    let time = startMins

    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds : seconds
    minutes = minutes < 10 ? '0' + minutes : minutes
    
    let interval;

    React.useEffect(() => {
        if (timer === 'active' && time > 0 && !onBreak) {
            interval = setInterval(() => {
                time--
                setMins(time)
                if (time < 0) {
                    setLabel('On Break')
                    playAudio()
                    clearInterval(interval)
                    if (!onBreak) {
                        setTimer('inactive')
                        setOnBreak(true)
                        setMins(breakLength *  60)
                        setTimer('active')
                    }
                }
            }, 1000)
        } else if (timer === 'active' && time > 0 && onBreak) {
            interval = setInterval(() => {
                time--
                setMins(time)
                if (time < 0) {
                    setLabel('Round')
                    playAudio()
                    clearInterval(interval)
                    setTimer('inactive')
                    setOnBreak(false)
                    setMins(sessionLength * 60)
                    setTimer('active')
                }
            }, 1000)
        }
        
        return function clear() {
            clearInterval(interval)
        }
    }, [timer])

    return (
        <div id="main-container" className="container">
            <div className="row text-center">
                <div className="col" id="title">Round Timer</div>
            </div>
            <div className="row text-center">
                <div className="col-sm-6" id="break-label">Break Length</div>
                <div className="col-sm-6" id="session-label">Round Length</div>
            </div>
            <div className="row text-center" id="button-row">
                <div className="col-sm-2 button"  id="break-decrement" onClick={() => {decBreak()}}>-</div>
                <div className="col-sm-2" id="break-length">{breakLength}</div>
                <div className="col-sm-2 button" id="break-increment" onClick={() => {incBreak()}}>+</div>
                <div className="col-sm-2 button" id="session-decrement" onClick={() => {decSession()}}>-</div>
                <div className="col-sm-2" id="session-length">{sessionLength}</div>
                <div className="col-sm-2 button" id="session-increment" onClick={() => {incSession()}}>+</div>
            </div>
            <div className="container" id="timer-box">
                <div className="row text-center">
                    <div className="col" id="timer-label">{timerLabel}</div>
                </div>
                <div className="row text-center">
                    <div className="col" id="time-left">{`${minutes}:${seconds}`}</div>
                </div>
                <div className="row text-center">
                    <div className="col button" id="start_stop" onClick={() => {activateTimer()}}>start/stop</div>
                </div>
                <div className="row text-center">
                    <div className="col button" id="reset" onClick={() => {resetTimer()}}>reset</div>
                </div>
            </div>
            <audio id="beep" src='https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Alarm%20Sounds/174[kb]ringmod-alarm-fadein.wav.mp3'  ></audio>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))