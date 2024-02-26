import { Img } from "@chakra-ui/react";

interface StarProps {
    size: string;
    active: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
}
const UIStar = ({ size = "sm", active = false, onMouseEnter, onMouseLeave, onClick }: StarProps) => {
    return (
        <Img
            src={`/images/icons/icon_star${active ? "" : "02"}.svg`}
            w={`${size === "sm" ? "2rem" : "3.6rem"}`}
            h="auto"
            cursor="pointer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        />
    );
};
export default UIStar;
