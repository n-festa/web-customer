import React from "react";

interface numProp {
    num: string | number;
    unit: string;
    flip: boolean;
}

const NumberBox = ({ num, unit, flip }: numProp) => {
    return <span>{num}</span>;
};

export default NumberBox;
