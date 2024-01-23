import { Button, HStack, Img, Input, useNumberInput } from "@chakra-ui/react";

interface Props {
    defaultValue?: number;
    onChangeValue?: (value: number) => void;
}

const NumbericStepper = ({ defaultValue = 1, onChangeValue }: Props) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: defaultValue,
        min: 0,
        max: 999,
        onChange: (_, valueAsNumber) => {
            onChangeValue?.(valueAsNumber);
        },
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <HStack maxW="10rem">
            <Button {...dec} variant={"btnNumbericStepper"}>
                <Img src="/images/icons/minus-circle.svg" />
            </Button>
            <Input {...input} isDisabled variant={"stepper"} />

            <Button {...inc} variant={"btnNumbericStepper"}>
                <Img src="/images/icons/plus-circle.svg" />
            </Button>
        </HStack>
    );
};

export default NumbericStepper;
