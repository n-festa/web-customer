import useRenderText from "@/hooks/useRenderText";
import { RestaurantDto } from "@/types/response/base";
import { getCutoffTime } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Box, Button, Center, Flex, HStack, Img, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";

interface Props {
    data: RestaurantDto;
}

const FoodChef = ({ data }: Props) => {
    const t = useTranslations("COMMON.FOOD_ITEM");
    const { renderTxt } = useRenderText();
    const {
        id,
        name,
        intro_video,
        rating,
        distance_km,
        delivery_time_s,
        specialty,
        top_food,
        min_price,
        max_price,
        having_vegeterian_food,
        promotion,
        cutoff_time,
    } = data;
    const [mounted, setMounted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const ref = useRef(null);
    const router = useRouter();
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    const _time = useMemo(() => {
        return getCutoffTime(cutoff_time, t);
    }, [cutoff_time, t]);

    return (
        <Flex
            position="relative"
            overflow="hidden"
            h="100%"
            borderRadius="2.4rem"
            boxShadow="var(--box-shadow-md)"
            bg="white"
            w="100%"
            cursor="pointer"
            flexDir="column"
            onClick={() => {
                router.push(`${routes.RestaurantDetail}/${id}`);
            }}
        >
            <VStack w="100%" bg="var(--primary-500)" position={"relative"} spacing={"0"}>
                {mounted ? (
                    <ReactPlayer
                        key={String(playing)}
                        playing={playing}
                        height={224}
                        width={"100%"}
                        ref={ref}
                        url={intro_video}
                        onClick={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setPlaying(false);
                        }}
                        playsInline
                        stopOnUnmount
                        config={{
                            youtube: {
                                playerVars: {
                                    controls: 0,
                                    rel: 0,
                                },
                            },
                            file: {
                                attributes: {
                                    controlsList: "nodownload",
                                },
                            },
                        }}
                    />
                ) : (
                    <></>
                )}
                {!playing && (
                    <Box position={"absolute"} top="0" left={"0"} right={"0"} bottom={"0"} bg="rgba(0,0,0,0.5)">
                        <Center h="100%">
                            <Button
                                variant={"btnPlayVideo"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setPlaying(true);
                                }}
                                className="plz"
                            >
                                <Img src={"/images/play_button.svg"} />
                            </Button>
                        </Center>
                    </Box>
                )}
            </VStack>
            <VStack w="100%" alignItems={"flex-start"} spacing={"0"} padding="0.8rem 2.4rem" position="relative">
                <Text fontSize={"2.4rem"} color="var(--gray-900)" fontWeight={"bold"} m="0">
                    {renderTxt(name) ?? "-"}
                </Text>

                <HStack spacing="0.8rem" w="100%">
                    <HStack spacing="1px">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/star-icon1.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                            {rating}
                        </Text>
                    </HStack>
                    <HStack spacing="0">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/markerpin021.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                            {distance_km ? distance_km?.toLocaleString() : "-"} km
                        </Text>
                    </HStack>
                    <HStack spacing="0">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/timer.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                            {delivery_time_s
                                ? (delivery_time_s / 60).toLocaleString(undefined, { maximumFractionDigits: 2 })
                                : "-"}{" "}
                            min
                        </Text>
                    </HStack>
                </HStack>
                <Text as="span" color="var(--gray-600)" fontSize={"1.6rem"} fontWeight={"700"}>
                    {renderTxt(specialty)} | {top_food}
                </Text>

                {promotion && (
                    <HStack spacing="0">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/frame-2729.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-600)" m="0" fontWeight={"500"}>
                            Ưu đãi đến 50k
                        </Text>
                    </HStack>
                )}
                {_time && (
                    <HStack spacing="0">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/frame-2725.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-600)" m="0" fontWeight={"500"}>
                            Đặt trước {_time} để điều chỉnh vị
                        </Text>
                    </HStack>
                )}
                {having_vegeterian_food && (
                    <HStack spacing="0">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/icons/vegan.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-600)" m="0" fontWeight={"500"}>
                            Có bán món chay
                        </Text>
                    </HStack>
                )}
                <Text color="black" fontWeight={"700"} fontSize={"2.4rem"} as="span" m="0">
                    {min_price?.toLocaleString()} - {max_price?.toLocaleString()}đ
                </Text>
            </VStack>
        </Flex>
    );
};

export default FoodChef;
