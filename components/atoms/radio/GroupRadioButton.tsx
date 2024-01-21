import RadioButton from "@/components/atoms/radio/RadioButton";
import { HStack, useRadioGroup } from "@chakra-ui/react";

interface Props {
    options: {
        value: string;
        name: string;
    }[];
    defaultValue: string;
    onChange: (value: string) => void;
}

const GroupRadioButton = ({ options, defaultValue, onChange }: Props) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        defaultValue: defaultValue,
        onChange: onChange,
    });

    const group = getRootProps();
    return (
        <HStack spacing={"0"} border="1px solid var(--gray-300)" borderRadius="0.8rem" overflow={"hidden"} {...group}>
            {options.map((el) => {
                const radio = getRadioProps({ value: el.value });
                return (
                    <RadioButton key={el.value} {...radio}>
                        {el.name}
                    </RadioButton>
                );
            })}
        </HStack>
    );
};

export default GroupRadioButton;
