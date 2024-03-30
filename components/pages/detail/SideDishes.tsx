import SkeletonBox from "@/components/molecules/SkeletonBox";
import WraperInfo from "@/components/molecules/WraperInfo";
import FoodItem from "@/components/organism/FoodItem";
import useSWRAPI from "@/hooks/useApi";
import useRenderText from "@/hooks/useRenderText";
import { SearchFoodType } from "@/types/enum";
import { routes } from "@/utils/routes";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const SideDishes = () => {
    const t = useTranslations("PRODUCT_DETAIL");
    const { renderTxt } = useRenderText();
    const { product } = useParams();
    const { GetSideDishByMenuItemId } = useSWRAPI();
    const { data, isLoading } = GetSideDishByMenuItemId(Number(product));
    const router = useRouter();

    const lstSideDish = useMemo(() => {
        return data?.data ?? [];
    }, [data]);

    return lstSideDish.length < 1 ? (
        <></>
    ) : (
        <WraperInfo
            title={t("SIDE_DISH")}
            titleProps={{ fontSize: "2.4rem" }}
            isViewAll={false}
            contentProps={{ mt: "1.6rem" }}
            mt="3.2rem"
            isShowBottom
            onClickViewAll={() => {
                router.push(
                    `${routes.SearchDetail}?foodId=${product}&name=${t("SIDE_DISH")}&detailType=${SearchFoodType.SideDish}`,
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
                    : lstSideDish.map((item) => {
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
                                      name={renderTxt(item.name)}
                                      images={item.image}
                                      merchart={renderTxt(item.restaurant_name)}
                                      cook_method={renderTxt(item.main_cooking_method)}
                                      currentPrice={item.price_after_discount}
                                      price={item.price}
                                      ingredientName={renderTxt([
                                          {
                                              ISO_language_code: "eng",
                                              text: item?.ingredient_brief_eng,
                                          },
                                          {
                                              ISO_language_code: "vie",
                                              text: item?.ingredient_brief_vie,
                                          },
                                      ])}
                                      kcal={item.calorie_kcal}
                                      cooking_time_s={item.cooking_time_s}
                                      distance={item.distance_km}
                                      ratings={item.rating}
                                      units_sold={item.units_sold}
                                      quantity_available={item.quantity_available}
                                      promotion={item.promotion}
                                      is_advanced_customizable={item.is_advanced_customizable}
                                      isShowRating={false}
                                      isShowDistance={false}
                                      isShowTime={false}
                                      isShowMerchart={false}
                                      isShowUnitSold={true}
                                      isShowQuantityAvailable={true}
                                  />
                              </WrapItem>
                          );
                      })}
            </Wrap>
        </WraperInfo>
    );
};

export default SideDishes;
