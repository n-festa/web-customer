import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import GroupWrapper from "./GroupWrapper";

const PromotionGroup = () => {
    return (
        <GroupWrapper title="Khuyến mãi">
            <InputGroup
                mt="1.6rem"
                alignItems="center"
                display="flex"
                borderRadius="99px"
                border="1px solid var(--gray-300)"
                h="5.6rem"
                as="form"
                w="33.9rem"
            >
                <Input
                    placeholder="Nhập mã khuyến mãi"
                    ml="1.6rem"
                    fontSize="1.8rem"
                    textOverflow="ellipsis"
                    mr="10rem"
                    variant="search"
                />

                <InputRightElement mr="1.6rem" h="100%" w="fit-content" display="flex" gap="0.5rem">
                    <Button fontSize="1.6rem" h="3.6rem" w="9.5rem" borderRadius="9rem" variant="solid">
                        Áp dụng
                    </Button>
                </InputRightElement>
            </InputGroup>
        </GroupWrapper>
    );
};

export default PromotionGroup;
