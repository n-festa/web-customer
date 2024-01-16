import React from "react";
import NumberBox from "./NumberBox";

interface timeProps {
    minutes: number;
    seconds: number;
}

const TimerContainer = ({ minutes, seconds }: timeProps) => {
    let minutesFlip = false;
    let secondsFlip = true;

    if (seconds <= 0 && minutes <= 0) {
        minutesFlip = false;
        secondsFlip = false;
    }

    if (seconds == 0) {
        if (minutes != 0) {
            seconds = 59;
        }

        secondsFlip = false;
        minutesFlip = true;
    }
    if (minutes == 0) {
        minutesFlip = false;
    }

    return (
        <div className=" mt-2  rounded-xl">
            <div className="grid grid-cols-2 gap-4 py-6 px-10 md:flex md:items-center md:justify-between md:mt-2  rounded-xl md:px-6 md:py-8 ">
                <NumberBox num={minutes} unit="Minutes" flip={minutesFlip} />
                <span className="hidden text-5xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50 ">:</span>
                <NumberBox num={seconds} unit="Seconds" flip={secondsFlip} />
            </div>
        </div>
    );
};

export default TimerContainer;
