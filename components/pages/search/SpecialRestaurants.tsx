"use client";
import Empty from "@/components/molecules/Empty";
import FoodChef from "@/components/molecules/FoodChef";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import WraperInfo from "@/components/molecules/WraperInfo";
import useSWRAPI from "@/hooks/useApi";
import { routes } from "@/utils/routes";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SpecialRestaurants = () => {
    const { GetGeneralRestaurantRecommendation } = useSWRAPI();
    const { data, isLoading } = GetGeneralRestaurantRecommendation();
    const router = useRouter();

    const onViewAll = () => {
        router.push(`${routes.SearchDetail}?viewAllRestaurant=true`);
    };

    return (
        <WraperInfo
            title="Bếp nổi bật tuần này"
            description="Khám phá những quán ăn, đầu bếp nổi bật xung quanh bạn"
            onClickViewAll={onViewAll}
            contentProps={{
                display: "flex",
                justifyContent: "center",
            }}
            mt="2.5rem"
        >
            <Wrap align="center" justify={"center"} spacing="4rem" w="100%">
                {isLoading ? (
                    Array.from([1, 2, 3], (index) => (
                        <WrapItem key={`skeleton${index}`} display="flex" flexDir="column" flex={1}>
                            <SkeletonBox isLoaded={false} />
                        </WrapItem>
                    ))
                ) : data && data?.data.length < 1 ? (
                    <Empty />
                ) : (
                    data?.data?.map((item) => (
                        <WrapItem
                            key={item.id}
                            flex={1}
                            minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                            maxW={{ base: "unset", md: "38.4rem" }}
                        >
                            <FoodChef data={item} />
                        </WrapItem>
                    ))
                )}
            </Wrap>
        </WraperInfo>
    );
};
export default SpecialRestaurants;
