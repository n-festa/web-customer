import { useState, useEffect, useCallback } from "react";

interface CountdownHook {
    seconds: number;
    formattedTime: string;
    resetCountdown: () => void;
}

const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
};

const useCountdown = (initialSeconds: number): CountdownHook => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds > 0) {
            const intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [seconds]);

    const resetCountdown = useCallback(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    return { seconds, formattedTime: formatTime(seconds), resetCountdown };
};

export default useCountdown;
