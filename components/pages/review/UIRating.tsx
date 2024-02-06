import React, { useState } from "react";
import UIStar from "./UIStar";
import { Flex } from "@chakra-ui/react";

interface UIRatingProps {
    maxRating: number;
    size: string;
    onRatingChange?: (rating: number) => void;
}

const UIRating = ({ maxRating, size }: UIRatingProps) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);

    const onMouseEnter = (index: React.SetStateAction<number>) => {
        setHoverRating(index);
    };

    const onMouseLeave = () => {
        setHoverRating(0);
    };

    const onSaveRating = (index: React.SetStateAction<number>) => {
        setSelectedRating(index);
        // onRatingChange(index);
    };

    const renderStar = (index: number) => {
        const isFilled = index <= (hoverRating || selectedRating);

        return (
            <UIStar
                key={index}
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={onMouseLeave}
                onClick={() => onSaveRating(index)}
                size={size}
                active={isFilled}
            />
        );
    };

    return (
        <Flex gap={`${size === "lg" ? "0.7rem" : "0.4rem"}`}>
            {[...Array(maxRating)].map((_star, index) => renderStar(index + 1))}
        </Flex>
    );
};
export default UIRating;
