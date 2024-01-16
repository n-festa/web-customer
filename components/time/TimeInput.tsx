import React from "react";

interface inputProps {
    value: number;
    handleClick(): void;
    handleChange(e: any): void;
}

const TimeInput = ({ value, handleClick, handleChange }: inputProps) => {
    return (
        <div>
            <input name="Timer Input" type="number" value={value} onChange={handleChange} min={0} />
            <button onClick={handleClick} className="text-xl">
                Set value{" "}
            </button>
        </div>
    );
};

export default TimeInput;
