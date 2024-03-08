import RadioButton from "@/components/atoms/radio/RadioButton";
import { BoxProps, HStack, useRadioGroup } from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
    options: {
        value: string;
        name: string;
    }[];
    value?: string;
    defaultValue?: string;
    isRounded?: boolean;
    isFormikControl?: boolean;
    isDisabled?: boolean;
    buttonStyle?: BoxProps;
    onChange?: (value: React.ChangeEvent<HTMLInputElement> | string | number) => void;
}

const GroupRadioButton = ({
    options,
    defaultValue,
    isRounded = false,
    value,
    isFormikControl = false,
    isDisabled,
    buttonStyle,
    ...rest
}: Props) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        defaultValue: defaultValue,
        value: value,
        ...rest,
    });

    const group = getRootProps();
    const style = useMemo(() => {
        if (isRounded)
            return {
                spacing: {
                    lg: "1.6rem",
                    base: "0.6rem",
                },
            };
        return {
            border: "1px solid var(--gray-300)",
            borderRadius: "0.8rem",
        };
    }, [isRounded]);

    return (
        <HStack
            spacing={"0"}
            overflow={"hidden"}
            {...style}
            {...(isFormikControl ? (rest as any) : undefined)}
            {...group}
        >
            {options.map((el) => {
                const radio = getRadioProps({ value: el.value });
                return (
                    <RadioButton
                        key={el.value}
                        value={el.value}
                        isRounded={isRounded}
                        isDisabled={isDisabled}
                        buttonStyle={buttonStyle}
                        {...radio}
                    >
                        {el.name}
                    </RadioButton>
                );
            })}
        </HStack>
    );
};

export default GroupRadioButton;
