import { Button, Img, Input, InputGroup, InputGroupProps, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { FormEvent } from "react";

const SearchLocation = (props: InputGroupProps & { onSubmit: (e: FormEvent<HTMLDivElement>) => void }) => {
    return (
        <InputGroup
            p="1rem 1.6rem"
            alignItems="center"
            display="flex"
            borderRadius="99px"
            border="1px solid var(--gray-300)"
            bg="var(--color-floralwhite)"
            h="5.6rem"
            as="form"
            {...props}
        >
            <InputLeftElement ml="1.6rem" h="100%" pointerEvents="none">
                <Img className="small-icon" alt="" src="/images/markerpin03.svg" />
            </InputLeftElement>
            <Input
                placeholder="Nhập địa chỉ để tìm món ngon gần bạn"
                ml="1.6rem"
                fontSize="1.8rem"
                mr="10.7rem"
                variant="search"
            />
            <InputRightElement mr="1.6rem" h="100%" w="9.1rem">
                <Button h="3.6rem" borderRadius="9rem" variant="solid" type="submit">
                    Tìm món
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

export default SearchLocation;
