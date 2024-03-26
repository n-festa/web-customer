import useSWRAPI from "@/hooks/useApi";
import { Flex, HStack, Image, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { isUndefined } from "lodash";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import GroupWrapper from "./GroupWrapper";

const PaymentMethodGroup = ({
    paymentMethod,
    setPaymentMethod,
}: {
    paymentMethod?: string;
    setPaymentMethod: (value: string) => void;
}) => {
    const t = useTranslations("CONFIRM_ORDER.PAYMENT_METHOD_GROUP");
    const { GetPaymentMethod } = useSWRAPI();
    const { data, isLoading } = GetPaymentMethod();
    useEffect(() => {
        if (data?.data?.[0] && isUndefined(paymentMethod)) {
            setPaymentMethod(String(data?.data?.[0].payment_id));
        }
    }, [data, paymentMethod, setPaymentMethod]);
    if (isLoading) return <></>;
    return (
        <GroupWrapper pb="2.4rem" title={t("TITLE")}>
            <RadioGroup px="2.4rem" mt="0.8rem" onChange={setPaymentMethod} value={paymentMethod}>
                <Stack direction="column">
                    {data?.data.map((item) => (
                        <Radio key={item.payment_id} size="l" spacing="1.2rem" value={String(item.payment_id)}>
                            <HStack spacing="1.2rem">
                                <Flex
                                    borderRadius="0.4rem"
                                    alignItems="center"
                                    justifyContent="center"
                                    w="4.6rem"
                                    h="3.2rem"
                                    border="var(--divider)"
                                >
                                    <Image
                                        src={item.payment_id === 1 ? `/images/momo.svg` : `/images/cash.svg`}
                                        alt="momo"
                                    />
                                </Flex>
                                <Text color="var(--gray-900)" fontWeight={500}>
                                    {item.name}
                                </Text>
                            </HStack>
                        </Radio>
                    ))}
                </Stack>
            </RadioGroup>
        </GroupWrapper>
    );
};

export default PaymentMethodGroup;
