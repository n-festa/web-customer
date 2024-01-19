"use client";

import { Button, ButtonProps, Img } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
    label?: String;
    variant?: string;
    onClick?: () => void;
}

export const BackButton = ({ label, onClick, variant = "btnBack", ...rest }: Props & Omit<ButtonProps, "onClick">) => {
    const router = useRouter();

    const handleClickBack = () => {
        if (onClick) {
            onClick();
            return;
        }
        router.back();
    };
    return (
        <Button leftIcon={<Img src="/images/chevronleft.svg" />} variant={variant} {...rest} onClick={handleClickBack}>
            {label}
        </Button>
    );
};
