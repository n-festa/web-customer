import { FormikTouched } from "formik";
import { ChangeEvent } from "react";

export type filedType = {
    name?: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string | number) => void;
    onBlur?: () => void;
    onChangeValue?: (value: string) => void;
};

export type formType = {
    touched?: FormikTouched<{
        name: boolean;
        email: boolean;
        birthday: boolean;
        height_m: boolean;
        weight_kg: boolean;
        phoneNumber: boolean;
        address: boolean;
        province: boolean;
        district: boolean;
        ward: boolean;
    }>;
    errors: {
        name: string;
        email: string;
        birthday: string;
        height_m: number;
        weight_kg: number;
        phoneNumber: string;
        address: string;
        province: string;
        district: string;
        ward: string;
    };
};
