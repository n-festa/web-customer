import RadioButton from "@/components/atoms/radio/RadioButton";
import { HStack, useRadioGroup } from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
    options: {
        value: string;
        name: string;
    }[];
    value?: string;
    defaultValue?: string;
    isRounded?: boolean;
    onChange: (value: string) => void;
}

const GroupRadioButton = ({ options, defaultValue, isRounded = false, value, onChange }: Props) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        defaultValue: defaultValue,
        value: value,
        onChange: onChange,
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
        <HStack spacing={"0"} overflow={"hidden"} {...style} {...group}>
            {options.map((el) => {
                const radio = getRadioProps({ value: el.value });
                return (
                    <RadioButton key={el.value} isRounded={isRounded} {...radio}>
                        {el.name}
                    </RadioButton>
                );
            })}
        </HStack>
    );
};

export default GroupRadioButton;
