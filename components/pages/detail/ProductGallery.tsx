import SkeletonBox from "@/components/molecules/SkeletonBox";
import IngredientInfo from "@/components/pages/detail/IngredientInfo";
import NutritionInfo from "@/components/pages/detail/NutritionInfo";
import ProductInfo from "@/components/pages/detail/ProductInfo";
import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import {
    Center,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props {
    info?: FoodDetailDto;
    isLoading?: boolean;
    activeSKU?: SKUsDto;
}

const ProductGallery = ({ info, isLoading, activeSKU }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const { isOpen: isOpenModal, onOpen, onClose } = useDisclosure();
    const [img, setImg] = useState<{ img: string; index: number }>({ img: "", index: 0 });

    useEffect(() => {
        const current = document.getElementById(img.img);
        if (current) {
            current.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
        }
    }, [img]);

    useEffect(() => {
        if (info?.images && info?.images.length > 0) {
            setImg({
                img: info?.images[0],
                index: 0,
            });
        }
    }, [info?.images]);

    return (
        <Flex w="100%" flexDirection={"column"} mt="1rem">
            <Stack direction={{ lg: "row", base: "column" }} w="100%">
                {isLoading ? (
                    <SkeletonBox isLoaded={false} mt="0.8rem" />
                ) : (
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
                                        setImg({
                                            img: el,
                                            index: index,
                                        });
                                    }}
                                    fallbackSrc="/images/food-detail.png"
                                    border={img.index == index ? "1px solid var(--gray-500)" : ""}
                                />
                            ))}
                        </Stack>
                        <Center
                            flex="1"
                            h="100%"
                            bg="var(--primary-500)"
                            borderRadius={"1.6rem"}
                            maxH={"33rem"}
                            p="1.5rem"
                        >
                            <Image
                                maxH="30rem"
                                maxW="90%"
                                key={String(img.index)}
                                src={img.img}
                                alt=""
                                objectFit={"contain"}
                                fallbackSrc="/images/food-detail.png"
                                onClick={onOpen}
                            />
                        </Center>
                    </Stack>
                )}
                {isLoading ? (
                    <SkeletonBox isLoaded={false} mt="0.8rem" />
                ) : (
                    <Flex w={{ lg: "40%", base: "100%" }}>
                        <VStack w="100%" align="flex-start" p="0.8rem 0rem 0.8rem 2.4rem" spacing="1rem">
                            <ProductInfo info={info} activeSKU={activeSKU} />
                            <NutritionInfo activeSKU={activeSKU} />
                        </VStack>
                    </Flex>
                )}
            </Stack>
            {isLoading ? (
                <SkeletonBox isLoaded={false} mt="0.8rem" />
            ) : (
                <IngredientInfo info={info} activeSKU={activeSKU} />
            )}
            <Modal isOpen={isOpenModal} onClose={onClose} isCentered variant={"preview"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody position={"relative"} borderRadius={"1.6rem"}>
                        <Center
                            borderRadius={"1.6rem"}
                            w="100%"
                            h="100%"
                            overflow={"hidden"}
                            bgPosition={"center"}
                            bgSize={"contain"}
                            bgRepeat={"no-repeat"}
                            style={{
                                backgroundImage: `url("${img.img}"), url("/images/food-detail.png")`,
                            }}
                        ></Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ProductGallery;
