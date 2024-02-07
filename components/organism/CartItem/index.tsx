import NumbericStepper from "@/components/molecules/NumbericStepper";
import { Flex, Image, Text } from "@chakra-ui/react";

const CartItem = ({
    price,
    nowPrice,
    note,
    name,
    image,
    quantity,
    onChangeValue,
    onDeleteCartItem,
}: {
    price?: string | number;
    nowPrice?: string | number;
    note?: string;
    name: string;
    image: string;
    quantity?: number;
    onChangeValue?: (value: number) => void;
    onDeleteCartItem?: () => void;
}) => {
    return (
        <Flex w="100%" px="1.6rem" justifyContent="flex-start">
            <Flex
                alignItems="center"
                justifyContent="center"
                w="5.6rem"
                h="5.6rem"
                borderRadius="0.8rem"
                mr="1.2rem"
                bg="var(--primary-color)"
            >
                <Image alt="food-img" src={image}></Image>
            </Flex>
            <Flex flex={1} minW="15rem" flexDir="column">
                <Text color="var(--gray-900)" fontSize="1.4rem" fontWeight={600}>
                    {name}
                </Text>
                <Text color="var(--gray-600)" fontSize="1.2rem">
                    {note}
                </Text>
            </Flex>
            <Flex alignItems="flex-start">
                <NumbericStepper
                    mx="1.6rem"
                    minW="6.3rem"
                    h="2.4rem"
                    defaultValue={quantity}
                    onChangeValue={onChangeValue}
                    inputProps={{
                        maxW: "3.5rem",
                        fontSize: "1.6rem",
                    }}
                    onReachZero={onDeleteCartItem}
                    buttonProps={{
                        w: "2rem",
                        h: "2rem",
                        minW: "2rem",
                        minH: "2rem",
                    }}
                />
            </Flex>
            <Flex color="var(--gray-900)" flexDir="column">
                <Text fontSize="1.8rem" fontWeight="600" textAlign="right">
                    {nowPrice}
                </Text>
                <Text fontSize="1.2rem" textAlign="right" textDecoration="line-through">
                    {price}
                </Text>
            </Flex>
        </Flex>
    );
};

export default CartItem;
