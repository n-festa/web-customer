import React from "react";

interface kCalType {
    kCal: number;
}

const kCal = ({ kCal }: kCalType) => {
    return <div className=" mt-2  rounded-xl">BMI : {kCal}</div>;
};

export default kCal;
