import { ChangeEvent } from "react";

export type filedType = {
    name?: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
};

export type formType = {
    touched?: () => void;
    errors: {
        name: string;
        email: string;
        birthday: string;
        height_m: number;
        weight_kg: number;
        phoneNumber: string;
    };
};