import { Flex, useRadioGroup } from "@chakra-ui/react";
import RadioCard from "../RadioCard";

type RadioCardGroupProps = {
    data: any;
    name: string;
    onChange: any;
};

const RadioCardGroup = ({ name, data, ...props }: RadioCardGroupProps) => {
    const { getRadioProps, getRootProps } = useRadioGroup({
        name: name,
        ...props,
    });
    const { ...group } = getRootProps();

    return (
        <Flex gap="0.8rem" mb="1.6rem" flexWrap="wrap" {...group}>
            {data.map((data: any) => {
                const radio = getRadioProps({ value: data.value });
                return (
                    <RadioCard key={data.value} name={name} onChangeInput={props.onChange} {...radio}>
                        {data.content}
                    </RadioCard>
                );
            })}
        </Flex>
    );
};

export default RadioCardGroup;
