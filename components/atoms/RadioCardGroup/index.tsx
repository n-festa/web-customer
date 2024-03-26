import { Box, Flex, Text, useRadioGroup } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import RadioCard from "../RadioCard";

type RadioCardGroupProps = {
    title?: string;
    data: { value: string; content: string }[];
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RadioCardGroup = ({ title, name, data, onChange, ...props }: RadioCardGroupProps) => {
    const { getRadioProps, getRootProps } = useRadioGroup({
        name: name,
        ...props,
    });
    const { ...group } = getRootProps();

    return (
        <Box>
            <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem" color="var(--gray-700)">
                {title}
            </Text>
            <Flex gap="0.8rem" mb="1.6rem" flexWrap="wrap" {...group}>
                {data.map((data) => {
                    const radio = getRadioProps({ value: data.value });
                    return (
                        <RadioCard key={data.value} name={name} onChangeInput={onChange} {...radio}>
                            {data.content}
                        </RadioCard>
                    );
                })}
            </Flex>
        </Box>
    );
};

export default RadioCardGroup;
