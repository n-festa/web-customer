import FoodItem from "@/components/organism/FoodItem";
import { CookingSchedule, RestaurantDetailDto } from "@/types/response/base";
import { EEE } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { isNullOrEmpty } from "@/utils/functions";
import { Box, Flex, HStack, Select, Switch, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { addDays } from "date-fns";
import { getDay } from "date-fns/getDay";
import { rest } from "lodash";
import { useMemo, useState } from "react";

interface Props {
    restaurantInfo?: RestaurantDetailDto;
}

const MenuToday = ({ restaurantInfo }: Props) => {
    const defaultValue = formatDate(new Date());
    const listOptions = useMemo(() => {
        const currentDate = new Date();
        const numberDate = 7 - getDay(currentDate);
        const options = [];
        if (numberDate == 1)
            return [
                {
                    value: defaultValue,
                    name: "Hôm nay",
                },
            ];

        const count = numberDate === 0 ? 7 : numberDate - 1;

        for (let i = 0; i < count; i++) {
            const item = addDays(currentDate, i);
            if (i === 0) {
                options.push({
                    value: formatDate(item),
                    name: "Hôm nay",
                });
                continue;
            }
            if (i === 1) {
                options.push({
                    value: formatDate(item),
                    name: "Ngày mai",
                });
                continue;
            }

            options.push({
                value: formatDate(item),
                name: formatDate(item),
            });
        }
        return options;
    }, []);

    const [condition, setCondition] = useState({
        is_vegetarian: false,
        cooking_schedule: defaultValue,
    });

    const originalMenu = useMemo(() => {
        let menu =
            restaurantInfo?.menu?.map((el) => ({
                ...el,
                cooking_schedule: (isNullOrEmpty(el.cooking_schedule)
                    ? []
                    : JSON.parse(el.cooking_schedule)) as CookingSchedule[],
            })) ?? [];

        menu = menu.map((item) => ({
            ...item,
            cooking_schedule: item.cooking_schedule?.filter((el) => el.is_available),
        }));

        return menu;
    }, [restaurantInfo?.menu]);

    const lstFood = useMemo(() => {
        let menu = [...originalMenu];

        if (condition.is_vegetarian) {
            menu = menu.filter((el) => el.is_vegetarian);
        }
        if (condition.cooking_schedule) {
            const dateOfWeek = formatDate(condition.cooking_schedule, EEE);
            menu = menu.filter((el) => {
                const cooking_schedule = el.cooking_schedule ?? [];
                return cooking_schedule.some((item) => dateOfWeek === item.day_name);
            });
        }
        return menu;
    }, [condition.cooking_schedule, condition.is_vegetarian, originalMenu]);

    return (
        <Flex flexDirection={"column"} alignItems={"flex-start"} w="100%" mt="3.2rem" {...rest}>
            <HStack spacing={"0.8rem"}>
                <Text variant={"header"} fontSize={"2rem"} fontWeight={600} lineHeight={"2rem"}>
                    Thực đơn
                </Text>
                <Select
                    placeholder=""
                    w="11.6rem"
                    variant={"filter"}
                    value={condition.cooking_schedule}
                    onChange={(e) => {
                        setCondition((prevState) => ({
                            ...prevState,
                            cooking_schedule: e.target.value,
                        }));
                    }}
                >
                    {listOptions.map((el, index) => (
                        <option key={String(index)} value={el.value}>
                            {el.name}
                        </option>
                    ))}
                </Select>
                <Switch
                    variant={"green"}
                    size="lg"
                    display={"flex"}
                    flexDirection={"row-reverse"}
                    defaultChecked={condition.is_vegetarian}
                    onChange={(e) => {
                        setCondition((prevState) => ({
                            ...prevState,
                            is_vegetarian: e.target.checked,
                        }));
                    }}
                >
                    <Text variant={"toggle"} px="0.8rem" textTransform={"capitalize"}>
                        Món chay
                    </Text>
                </Switch>
            </HStack>

            <Box w="100%" mt="2.4rem" flex={1}>
                <Wrap align="center" justify={"space-between"} spacing={{ base: "4rem", "2xl": "1rem" }} w="100%">
                    {lstFood.map((item) => (
                        <WrapItem
                            key={item.id}
                            flex={1}
                            minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                            maxW={{ base: "unset", md: "38.4rem" }}
                        >
                            <FoodItem
                                key={item.id}
                                id={item.id}
                                name={item.name?.[0].text}
                                images={item.image}
                                top_label={item.top_label}
                                merchart={item.restaurant_name?.[0].text}
                                cook_method={item.main_cooking_method?.[0].text}
                                currentPrice={item.price_after_discount}
                                price={item.price}
                                ingredientName={item.ingredient_brief_vie}
                                kcal={item.calorie_kcal}
                                cooking_time_s={item.cooking_time_s}
                                distance={item.distance_km}
                                ratings={item.rating}
                                units_sold={item.units_sold}
                                quantity_available={item.quantity_available}
                                promotion={item.promotion}
                                cutoff_time={item.cutoff_time}
                                isShowRating={false}
                                isShowDistance={false}
                                isShowTime={false}
                                isShowMerchart={false}
                                isShowUnitSold={true}
                                isShowQuantityAvailable={true}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>
        </Flex>
    );
};

export default MenuToday;
