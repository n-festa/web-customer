import NumbericStepper from "@/components/molecules/NumbericStepper";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

interface Props {
    quantity?: number;
    price: number;
    onUpdateCart: (quantity: number) => void;
    loading?: boolean;
}

const OrderFooter = ({ loading, quantity = 1, price = 0, onUpdateCart }: Props) => {
    const [state, setState] = useState(quantity);

    useEffect(() => {
        if (quantity !== state) {
            setState(quantity);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    const totalPrice = useMemo(() => {
        return state * price;
    }, [state, price]);

    return (
        <Flex
            w="100%"
            justifyContent={"center"}
            bg="#FAFFDD"
            position={"fixed"}
            left={"0"}
            bottom="0"
            right="0"
            py="1.6rem"
            zIndex={10}
        >
            <HStack spacing={"2.4rem"}>
                <NumbericStepper defaultValue={quantity} onChangeValue={setState} />
                <Button
                    h="5.4rem"
                    isLoading={loading}
                    borderRadius="2.4rem"
                    variant={"btnAddToCart"}
                    _loading={{
                        _hover: {
                            bg: "var(--primary-color)",
                        },
                    }}
                    onClick={() => {
                        onUpdateCart(state);
                    }}
                >
                    Thêm vào giỏ hàng - {totalPrice.toLocaleString()}VND
                </Button>
            </HStack>
        </Flex>
    );
};

export default OrderFooter;
