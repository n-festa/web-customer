import {
    Box,
    Button,
    Center,
    Collapse,
    Flex,
    HStack,
    Image,
    Img,
    Stack,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface Props {}

const RestaurantGallery = (_props: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const { isOpen, onToggle } = useDisclosure();
    const [img, setImg] = useState<string>("");

    useEffect(() => {
        const current = document.getElementById(img);
        if (current) {
            current.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
        }
    }, [img]);

    const videoRef = useRef(null);
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    return (
        <Flex w="100%" flexDirection={"column"} mt="1rem">
            <VStack flex={1} alignItems={"flex-start"} w="100%" h="100%">
                <Stack
                    direction={{ md: "row", base: "column" }}
                    flex="1"
                    justifyContent={"center"}
                    alignItems={"center"}
                    w="100%"
                >
                    <VStack
                        w="100%"
                        bg="var(--primary-500)"
                        position={"relative"}
                        spacing={"0"}
                        borderRadius={"1.6rem"}
                        overflow={"hidden"}
                        h={"47.4rem"}
                    >
                        {mounted ? (
                            <ReactPlayer
                                key={String(playing)}
                                playing={playing}
                                height={"100%"}
                                width={"100%"}
                                ref={videoRef}
                                url={"intro_video"}
                                light="/images/fallback-restaurant.png"
                                onClick={() => {
                                    setPlaying(false);
                                }}
                                playsInline
                                playIcon={<></>}
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
                                        onClick={() => {
                                            setPlaying(true);
                                        }}
                                        className="plz"
                                    >
                                        <Img src={"/images/play_button.svg"} w="10rem" h="10rem" />
                                    </Button>
                                </Center>
                            </Box>
                        )}
                    </VStack>
                    <Stack
                        direction={{ base: "row", md: "column" }}
                        justifyContent={{ md: "space-between" }}
                        h={{ base: "17rem", md: "100%" }}
                        w={{ base: "100%", md: "23.5rem" }}
                        maxH={{ base: "unset", md: "47.4rem" }}
                        overflow={"hidden"}
                        overflowY={{ md: "scroll", base: "hidden" }}
                        overflowX={{ md: "hidden", base: "scroll" }}
                        ref={ref}
                    >
                        {["/images/restaurant-1.png", "/images/restaurant-2.png", "/images/restaurant-3.png"]?.map(
                            (el, index) => (
                                <Image
                                    w="23.5rem"
                                    h="15.1rem"
                                    objectFit="cover"
                                    src={el}
                                    alt=""
                                    key={String(index)}
                                    cursor={"pointer"}
                                    borderRadius={"1.6rem"}
                                    id={el}
                                    onClick={() => {
                                        if (img !== el) {
                                            setImg(el);
                                        }
                                    }}
                                    fallbackSrc="/images/restaurant-1.png"
                                />
                            ),
                        )}
                    </Stack>
                </Stack>
                <VStack
                    w="100%"
                    alignItems={"flex-start"}
                    spacing={"1.6rem"}
                    padding="0.8rem 2.4rem"
                    position="relative"
                >
                    <HStack w="100%">
                        <VStack flex={1} alignItems={"flex-start"}>
                            <Text fontSize={"2.4rem"} color="var(--gray-900)" fontWeight={"bold"} m="0">
                                The Chef Town
                            </Text>
                            <Text fontSize={"1.8rem"} color="black" fontWeight={"600"} m="0">
                                Eat clean | Cơm Nhật Tonkatsu
                            </Text>
                        </VStack>
                        <VStack w="33.6rem" alignItems={"flex-start"}>
                            <HStack spacing="0.8rem" w="100%">
                                <HStack spacing="1px">
                                    <Img w="2.4rem" height={"2.4rem"} src="/images/star-icon1.svg" />
                                    <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                                        4.5(100+)
                                    </Text>
                                </HStack>
                                <HStack spacing="0">
                                    <Img w="2.4rem" height={"2.4rem"} src="/images/markerpin021.svg" />
                                    <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                                        3.2km
                                    </Text>
                                </HStack>
                                <HStack spacing="0">
                                    <Img w="2.4rem" height={"2.4rem"} src="/images/timer.svg" />
                                    <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                                        20min
                                    </Text>
                                </HStack>
                            </HStack>

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
                        </VStack>
                    </HStack>
                    <Collapse in={isOpen} animateOpacity startingHeight={"4.8rem"}>
                        <Text fontSize={"1.6rem"} fontWeight={400} lineHeight={"2.4rem"} color="var(--gray-600)">
                            Khi đam mê về ẩm thực chuẩn mực và món ăn ngon hòa cùng đam mê một body khỏe đẹp và
                            lifestyle năng động, The Chef Town ra đời! Thành lập 2019, một start-up kết hợp gồm Chef
                            chuyên nghiệp & Chuyên Gia Dinh
                        </Text>
                        <Text fontSize={"1.6rem"} fontWeight={400} lineHeight={"2.4rem"} color="var(--gray-600)">
                            Khi đam mê về ẩm thực chuẩn mực và món ăn ngon hòa cùng đam mê một body khỏe đẹp và
                            lifestyle năng động, The Chef Town ra đời! Thành lập 2019, một start-up kết hợp gồm Chef
                            chuyên nghiệp & Chuyên Gia Dinh
                        </Text>
                        <Text fontSize={"1.6rem"} fontWeight={400} lineHeight={"2.4rem"} color="var(--gray-600)">
                            Khi đam mê về ẩm thực chuẩn mực và món ăn ngon hòa cùng đam mê một body khỏe đẹp và
                            lifestyle năng động, The Chef Town ra đời! Thành lập 2019, một start-up kết hợp gồm Chef
                            chuyên nghiệp & Chuyên Gia Dinh
                        </Text>
                    </Collapse>
                    <Button variant={"btnViewAllSm"} onClick={onToggle} p="0">
                        Xem tất cả
                    </Button>
                </VStack>
            </VStack>
        </Flex>
    );
};

export default RestaurantGallery;
