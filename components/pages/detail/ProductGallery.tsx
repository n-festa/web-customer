import IngredientInfo from "@/components/pages/detail/IngredientInfo";
import NutritionInfo from "@/components/pages/detail/NutritionInfo";
import ProductInfo from "@/components/pages/detail/ProductInfo";
import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { Center, Flex, Image, Stack, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
    info?: FoodDetailDto;
    listSKUs?: SKUsDto[];
}

const ProductGallery = ({ info, listSKUs = [] }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const [img, setImg] = useState<string>("");

    useEffect(() => {
        const current = document.getElementById(img);
        if (current) {
            current.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
        }
    }, [img]);

    useEffect(() => {
        if (info?.images && info?.images.length > 0) {
            setImg(info?.images[0]);
        }
    }, [info?.images]);

    const activeSKU = useMemo(() => {
        const item = listSKUs.find((el) => el.is_standard);
        if (item) {
            return item;
        }
        return undefined;
    }, [listSKUs]);

    return (
        <Flex w="100%" flexDirection={"column"} mt="1rem">
            <Stack direction={{ lg: "row", base: "column" }} w="100%">
                <Stack
                    direction={{ md: "row", base: "column-reverse" }}
                    flex="1"
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Stack
                        direction={{ base: "row", md: "column" }}
                        justifyContent={{ md: "space-between", base: "center" }}
                        h={{ base: "10rem", md: "100%" }}
                        w={{ base: "100%", md: "10rem" }}
                        maxH={{ base: "unset", md: "33rem" }}
                        overflow={"hidden"}
                        overflowY={{ md: "scroll", base: "hidden" }}
                        overflowX={{ md: "hidden", base: "scroll" }}
                        ref={ref}
                    >
                        {info?.images?.map((el, index) => (
                            <Image
                                boxSize="10rem"
                                objectFit="cover"
                                src={el}
                                alt=""
                                key={String(index)}
                                cursor={"pointer"}
                                borderRadius={"0.8rem"}
                                id={el}
                                onClick={() => {
                                    if (img !== el) {
                                        setImg(el);
                                    }
                                }}
                                fallbackSrc="/images/food-detail.png"
                            />
                        ))}
                    </Stack>
                    <Center flex="1" h="100%" bg="var(--primary-500)" borderRadius={"1.6rem"} maxH={"33rem"} p="1.5rem">
                        <Image
                            maxH="30rem"
                            maxW="90%"
                            src={img}
                            alt=""
                            objectFit={"contain"}
                            fallbackSrc="/images/food-detail.png"
                        />
                    </Center>
                </Stack>
                <Flex w={{ lg: "40%", base: "100%" }}>
                    <VStack w="100%" align="flex-start" p="0.8rem 0rem 0.8rem 2.4rem" spacing="1rem">
                        <ProductInfo info={info} activeSKU={activeSKU} />
                        <NutritionInfo activeSKU={activeSKU} />
                    </VStack>
                </Flex>
            </Stack>
            <IngredientInfo info={info} activeSKU={activeSKU} />
        </Flex>
    );
};

export default ProductGallery;
