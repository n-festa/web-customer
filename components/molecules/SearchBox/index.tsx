import { Img, Input, InputGroup, InputGroupProps, InputLeftElement, InputProps } from "@chakra-ui/react";

interface Props {
    groupsProps?: InputGroupProps;
}

const SeachBox = ({ groupsProps, ...rest }: Props & InputProps) => {
    return (
        <InputGroup variant={"searchBox"} {...groupsProps}>
            <InputLeftElement pointerEvents="none">
                <Img src="/images/search-md.svg" />
            </InputLeftElement>
            <Input pl="6rem" {...rest} />
        </InputGroup>
    );
};

export default SeachBox;
