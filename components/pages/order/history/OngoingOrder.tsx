import SkeletonBox from "@/components/molecules/SkeletonBox";
import OnGoingOrderItem from "@/components/pages/order/history/OnGoingOrderItem";
import { OnGoingOrder } from "@/types/response/OnGoingOrderResponse";
import { VStack } from "@chakra-ui/react";

interface Props {
    orderInfo: OnGoingOrder[];
    isLoading?: boolean;
}

const OnGoingOrder = ({ orderInfo, isLoading }: Props) => {
    return (
        <VStack flexDirection={"column"} spacing={"0.8rem"}>
            {isLoading ? (
                <>
                    <SkeletonBox isLoaded={false} />
                    <SkeletonBox isLoaded={false} />
                    <SkeletonBox isLoaded={false} />
                </>
            ) : (
                orderInfo.map((el, index) => <OnGoingOrderItem key={String(index)} orderInfo={el} />)
            )}
        </VStack>
    );
};
export default OnGoingOrder;
