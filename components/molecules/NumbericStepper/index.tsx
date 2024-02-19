import { Button, ButtonProps, HStack, Img, Input, InputProps, StackProps, useNumberInput } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
    onReachZero?: () => void;
    buttonProps?: ButtonProps;
    inputProps?: InputProps;
}

const NumbericStepper = ({
    defaultValue = 1,
    onChangeValue,
    onReachZero,
    buttonProps,
    inputProps,
    ...props
}: Props & StackProps) => {
    const [value, setValue] = useState(defaultValue);
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: defaultValue,
        min: 0,
        max: 99,
        value: value,
        onChange: (_, valueAsNumber) => {
            if (!onReachZero || valueAsNumber > 0) {
                setValue(valueAsNumber);
                onChangeValue?.(valueAsNumber);
                return;
            }
            onReachZero?.();
        },
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <HStack maxW="10rem" {...props}>
            <Button {...dec} variant={"btnNumbericStepper"} {...buttonProps}>
                <Img src="/images/icons/minus-circle.svg" />
            </Button>
            <Input {...input} isDisabled variant={"stepper"} {...inputProps} />
            <Button {...inc} variant={"btnNumbericStepper"} {...buttonProps}>
                <Img src="/images/icons/plus-circle.svg" />
            </Button>
        </HStack>
    );
};

export default NumbericStepper;
