/*

const [time] = useState<number>(2);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const timeToDays = time * 60 * 1000;

    let countDownDate = new Date().getTime() + timeToDays;


    useEffect(() => {
        var updateTime = setInterval(() => {
        var now = new Date().getTime();

        var difference = countDownDate - now;

        var newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

        setMinutes(newMinutes);
        setSeconds(newSeconds);


        if (difference <= 0) {
            clearInterval(updateTime);
            setMinutes(0);
            setSeconds(0);
        }
        })

        return () => {
        clearInterval(updateTime);
        }

    }, [time]);



        <TimerContainer
                            minutes={minutes}
                            seconds={seconds}
                        />
                        <BMI height={162} weight={70} />
*/
