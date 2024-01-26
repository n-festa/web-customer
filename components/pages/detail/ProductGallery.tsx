import IngredientInfo from "@/components/pages/detail/IngredientInfo";
import NutritionInfo from "@/components/pages/detail/NutritionInfo";
import ProductInfo from "@/components/pages/detail/ProductInfo";
import { Center, Flex, Image, Stack, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const ProductGallery = () => {
    const lstImages = [
        "/images/food-detail.png",
        "/images/food-detail-1.png",
        "/images/food-detail-2.png",
        "/images/food-detail-3.png",
    ];
    const ref = useRef<HTMLDivElement>(null);

    const [img, setImg] = useState(lstImages[0]);

    useEffect(() => {
        const current = document.getElementById(img);
        if (current) {
            current.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
        }
    }, [img]);

    return (
        <Flex w="100%" flexDirection={"column"}>
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
                        {lstImages.map((el, index) => (
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
                            />
                        ))}
                    </Stack>
                    <Center flex="1" h="100%" bg="var(--primary-500)" borderRadius={"1.6rem"} maxH={"33rem"} p="1.5rem">
                        <Image maxH="30rem" maxW="90%" src={img} alt="" objectFit={"contain"} />
                    </Center>
                </Stack>
                <Flex w={{ lg: "40%", base: "100%" }}>
                    <VStack w="100%" align="flex-start" p="0.8rem 0rem 0.8rem 2.4rem" spacing="1rem">
                        <ProductInfo />
                        <NutritionInfo />
                    </VStack>
                </Flex>
            </Stack>
            <IngredientInfo />
        </Flex>
    );
};

export default ProductGallery;
