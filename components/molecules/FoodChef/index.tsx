import { RestaurantDtos } from "@/types/interfaces";
import { Button, Flex, HStack, Img, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

interface Props {
    data: RestaurantDtos;
}

const FoodChef = ({ data }: Props) => {
    const { name, time, distance, ratings, minPrice, maxPrice, type, bestSeller } = data;
    const [mounted, setMounted] = useState(false);
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    return (
        <Flex
            position="relative"
            overflow="hidden"
            h="100%"
            borderRadius="2.4rem"
            boxShadow="var(--box-shadow-md)"
            bg="white"
            w="100%"
            flexDir="column"
        >
            <VStack w="100%" bg="var(--primary-500)" spacing={"0"} backgroundImage={"/images/thumbnail-player.png"}>
                {mounted ? (
                    <ReactPlayer
                        playing={playing}
                        height={224}
                        width={170}
                        url="https://www.youtube.com/watch?v=1IyyGmSzvSw"
                        light="/images/thumbnail-player.png"
                        controls
                        pip
                        playIcon={
                            <Button
                                variant={"btnPlayVideo"}
                                onClick={() => {
                                    setPlaying(true);
                                }}
                            >
                                <Img src={"/images/play_button.svg"} />
                            </Button>
                        }
                        stopOnUnmount
                        config={{
                            youtube: {
                                playerVars: {
                                    controls: 0,
                                    rel: 0,
                                },
                            },
                        }}
                    />
                ) : (
                    <></>
                )}
            </VStack>
            <VStack w="100%" alignItems={"flex-start"} spacing={"0"} padding="0.8rem 2.4rem" position="relative">
                <Text fontSize={"2.4rem"} color="var(--gray-900)" fontWeight={"bold"} m="0">
                    {name}
                </Text>

                <HStack spacing="0.8rem" w="100%">
                    <HStack spacing="1px">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/star-icon1.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                            {ratings}
                        </Text>
                    </HStack>
                    <HStack spacing="0">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/markerpin021.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                            {distance} km
                        </Text>
                    </HStack>
                    <HStack spacing="0">
                        <Img w="2.4rem" height={"2.4rem"} src="/images/timer.svg" />
                        <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                            {time} min
                        </Text>
                    </HStack>
                </HStack>
                <Text as="span" color="var(--gray-600)" fontSize={"1.6rem"} fontWeight={"700"}>
                    {type} | {bestSeller}
                </Text>

                <HStack spacing="0">
                    <Img w="2.4rem" height={"2.4rem"} src="/images/frame-2729.svg" />
                    <Text fontSize={"1.6rem"} color="var(--gray-600)" m="0" fontWeight={"500"}>
                        Ưu đãi đến 50k
                    </Text>
                </HStack>
                <HStack spacing="0">
                    <Img w="2.4rem" height={"2.4rem"} src="/images/frame-2725.svg" />
                    <Text fontSize={"1.6rem"} color="var(--gray-600)" m="0" fontWeight={"500"}>
                        Đặt trước 09:00 giờ sáng để điều chỉnh vị
                    </Text>
                </HStack>
                <HStack spacing="0">
                    <Img w="2.4rem" height={"2.4rem"} src="/images/icons/vegan.svg" />
                    <Text fontSize={"1.6rem"} color="var(--gray-600)" m="0" fontWeight={"500"}>
                        Có bán món chay
                    </Text>
                </HStack>
                <Text color="black" fontWeight={"700"} fontSize={"2.4rem"} as="span" m="0">
                    {minPrice?.toLocaleString()} - {maxPrice?.toLocaleString()}đ
                </Text>
            </VStack>
        </Flex>
    );
};

export default FoodChef;
