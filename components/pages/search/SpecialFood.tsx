"use client";
import Empty from "@/components/molecules/Empty";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import WraperInfo from "@/components/molecules/WraperInfo";
import FoodItem from "@/components/organism/FoodItem";
import useSWRAPI from "@/hooks/useApi";
import { SearchFoodType } from "@/types/enum";
import { routes } from "@/utils/routes";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "use-intl";

const SpecialFood = () => {
    const t = useTranslations("SEARCH.SPECIAL_FOOD");
    const { GetGeneralFoodRecommendation } = useSWRAPI();
    const { data, isLoading } = GetGeneralFoodRecommendation();
    const router = useRouter();

    const onViewAll = () => {
        router.push(`${routes.SearchDetail}?&detailType=${SearchFoodType.AllFood}&name=${t("TITLE")}`);
    };

    const lstRecommendFood = useMemo(() => {
        return data?.data ?? [];
    }, [data]);

    return lstRecommendFood.length < 1 ? (
        <></>
    ) : (
        <WraperInfo
            title={t("TITLE")}
            description={t("DESCRIPTION")}
            onClickViewAll={onViewAll}
            contentProps={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Wrap align="stretch" justify={"center"} spacing="2rem" w="100%">
                {isLoading ? (
                    Array.from([1, 2, 3], (index) => (
                        <WrapItem key={`skeleton${index}`} display="flex" flexDir="column" flex={1}>
                            <SkeletonBox isLoaded={false} />
                        </WrapItem>
                    ))
                ) : data && data?.data.length < 1 ? (
                    <Empty />
                ) : (
                    lstRecommendFood.map((item) => {
                        return (
                            <WrapItem
                                key={item.id}
                                flex={1}
                                minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                                maxW={{ base: "unset", md: "38.4rem" }}
                                minH="52.6rem"
                            >
                                <FoodItem
                                    key={item.id}
                                    top_label={item.top_label}
                                    id={item.id}
                                    name={item.name?.[0].text ?? "-"}
                                    images={item.image}
                                    merchart={item.restaurant_name?.[0].text}
                                    cook_method={item.main_cooking_method?.[0]?.text}
                                    currentPrice={item.price_after_discount}
                                    price={item.price}
                                    ingredientName={item.ingredient_brief_vie}
                                    kcal={item.calorie_kcal?.toLocaleString()}
                                    distance={item.distance_km}
                                    ratings={item.rating}
                                    promotion={item.promotion}
                                    cutoff_time={item.cutoff_time}
                                    cooking_time_s={item.cooking_time_s}
                                    restaurantId={item.restaurant_id}
                                />
                            </WrapItem>
                        );
                    })
                )}
            </Wrap>
        </WraperInfo>
    );
};
export default SpecialFood;
