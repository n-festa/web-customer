import { Button, ButtonProps, HStack, Img, Input, InputProps, StackProps, useNumberInput } from "@chakra-ui/react";

interface Props {
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
    buttonProps?: ButtonProps;
    inputProps?: InputProps;
}

const NumbericStepper = ({
    defaultValue = 1,
    onChangeValue,
    buttonProps,
    inputProps,
    ...props
}: Props & StackProps) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: defaultValue,
        min: 1,
        max: 999,
        onChange: (_, valueAsNumber) => {
            onChangeValue?.(valueAsNumber);
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
