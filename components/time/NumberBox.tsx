interface numProp {
    num: string | number;
    unit: string;
    flip: boolean;
}

const NumberBox = ({ num }: numProp) => {
    return <span>{num}</span>;
};

export default NumberBox;
