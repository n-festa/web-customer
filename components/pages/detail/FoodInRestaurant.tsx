import SkeletonBox from "@/components/molecules/SkeletonBox";
import WraperInfo from "@/components/molecules/WraperInfo";
import FoodItem from "@/components/organism/FoodItem";
import useSWRAPI from "@/hooks/useApi";
import useRenderText from "@/hooks/useRenderText";
import { SearchFoodType } from "@/types/enum";
import products from "@/utils/data/products";
import { routes } from "@/utils/routes";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const FoodInRestaurant = () => {
    const t = useTranslations("PRODUCT_DETAIL");
    const { renderTxt } = useRenderText();
    const { product } = useParams();
    const router = useRouter();
    const { GetCurrentAvailableFoodByRestaurant } = useSWRAPI();
    const { data, isLoading } = GetCurrentAvailableFoodByRestaurant(Number(product));

    const lstRestaurants = useMemo(() => {
        return data?.data ?? [];
    }, [data]);

    return lstRestaurants.length < 1 ? (
        <></>
    ) : (
        <WraperInfo
            title={t("SAME_RESTAURANT")}
            titleProps={{ fontSize: "2.4rem" }}
            isViewAll={false}
            contentProps={{ mt: "1.6rem" }}
            mt="5.6rem"
            isShowBottom
            onClickViewAll={() => {
                router.push(
                    `${routes.SearchDetail}?foodId=${product}&name=${t("SAME_RESTAURANT")}&detailType=${SearchFoodType.SameRestaurant}`,
                );
            }}
        >
            <Wrap align="center" justify={"center"} spacing="4rem" w="100%">
                {isLoading
                    ? Array.from([1, 2, 3], (index) => (
                          <WrapItem key={`skeleton${index}`} display="flex" flexDir="column" flex={1}>
                              <SkeletonBox isLoaded={false} />
                          </WrapItem>
                      ))
                    : products.map((item) => (
                          <WrapItem
                              key={item.id}
                              flex={1}
                              minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                              maxW={{ base: "unset", md: "38.4rem" }}
                          >
                              <FoodItem
                                  key={item.id}
                                  id={item.id}
                                  name={renderTxt(item.name)}
                                  images={item.image}
                                  merchart={renderTxt(item.restaurant_name)}
                                  cook_method={renderTxt(item.main_cooking_method)}
                                  currentPrice={item.price_after_discount}
                                  price={item.price}
                                  ingredientName={item.ingredient_brief_vie}
                                  kcal={item.calorie_kcal}
                                  cooking_time_s={item.cooking_time_s}
                                  distance={item.distance_km}
                                  ratings={item.rating}
                                  units_sold={item.units_sold}
                                  quantity_available={item.quantity_available}
                                  isShowRating={false}
                                  isShowDistance={false}
                                  isShowTime={false}
                                  isShowMerchart={false}
                                  cutoff_time={item.cutoff_time}
                                  promotion={item.promotion}
                                  isShowUnitSold={true}
                                  isShowQuantityAvailable={true}
                              />
                          </WrapItem>
                      ))}
            </Wrap>
        </WraperInfo>
    );
};

export default FoodInRestaurant;
