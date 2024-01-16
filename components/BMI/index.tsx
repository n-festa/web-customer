import React from "react";

interface BMIType {
    height: number;
    weight: number;
}

const BMI = ({ height, weight }: BMIType) => {
    const BMIindex = (weight / (height * height)) * 10000;
    return <div className=" mt-2  rounded-xl">BMI : {BMIindex}</div>;
};

export default BMI;
