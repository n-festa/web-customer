import { Flex, HStack, Image, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import GroupWrapper from "./GroupWrapper";

const PaymentMethodGroup = () => {
    const [value, setValue] = useState("1");

    return (
        <GroupWrapper pb="2.4rem" title="Phương thức thanh toán">
            <RadioGroup px="2.4rem" mt="0.8rem" onChange={setValue} value={value}>
                <Stack direction="column">
                    <Radio size="l" spacing="1.2rem" value="1">
                        <HStack spacing="1.2rem">
                            <Flex
                                borderRadius="0.4rem"
                                alignItems="center"
                                justifyContent="center"
                                w="4.6rem"
                                h="3.2rem"
                                border="var(--divider)"
                            >
                                <Image src="/images/momo.svg" alt="momo" />
                            </Flex>
                            <Text color="var(--gray-900)" fontWeight={500}>
                                Thanh toán bằng Momo
                            </Text>
                        </HStack>
                    </Radio>
                    <Radio size="l" spacing="1.2rem" value="2">
                        <HStack spacing="1.2rem">
                            <Flex
                                borderRadius="0.4rem"
                                alignItems="center"
                                justifyContent="center"
                                w="4.6rem"
                                h="3.2rem"
                                border="var(--divider)"
                            >
                                <Image src="/images/cash.svg" alt="cash" />
                            </Flex>
                            <Text color="var(--gray-900)" fontWeight={500}>
                                Thanh toán bằng bằng tiền mặt
                            </Text>
                        </HStack>
                    </Radio>
                </Stack>
            </RadioGroup>
        </GroupWrapper>
    );
};

export default PaymentMethodGroup;
