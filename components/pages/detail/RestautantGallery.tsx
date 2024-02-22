import SkeletonBox from "@/components/molecules/SkeletonBox";
import { MediaType } from "@/types/enum";
import { Media, RestaurantDetailDto } from "@/types/response/base";
import { getCutoffTime } from "@/utils/functions";
import {
    Box,
    Button,
    Center,
    Collapse,
    Flex,
    HStack,
    Image,
    Img,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
    restaurantInfo?: RestaurantDetailDto;
    isLoading?: boolean;
}

const RestaurantGallery = ({ restaurantInfo, isLoading }: Props) => {
    const t = useTranslations("COMMON");
    const ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [playing, setPlaying] = useState(false);
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpenModal, onOpen, onClose } = useDisclosure();
    const [media, setMedia] = useState<Media & { id: string }>({
        type: MediaType.Video,
        url: "",
        id: "",
    });

    const onChangeMedia = (value: Media, id: string) => {
        setMedia({
            ...value,
            id: id,
        });
        const current = document.getElementById(id);
        if (current) {
            current.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
        }
    };

    const videoRef = useRef(null);
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    useEffect(() => {
        const medias = restaurantInfo?.medias ?? [];
        if (medias.length > 0) {
            const videoIndex = medias.findIndex((el) => el.type === MediaType.Video);
            if (videoIndex != -1) {
                setMedia({
                    ...medias[videoIndex],
                    id: `media_${videoIndex}`,
                });
            } else
                setMedia({
                    ...medias[0],
                    id: `media_0`,
                });
        }
    }, [restaurantInfo]);

    const _time = useMemo(() => {
        const cutoffTime = restaurantInfo?.cutoff_time ?? [];

        return getCutoffTime(cutoffTime);
    }, [restaurantInfo?.cutoff_time]);

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
                        {media?.type === MediaType.Video ? (
                            <>
                                <ReactPlayer
                                    key={String(playing)}
                                    playing={playing}
                                    height={"100%"}
                                    width={"100%"}
                                    ref={videoRef}
                                    url={media?.url}
                                    light={
                                        !media || (media && !media?.url) ? "/images/fallback-restaurant.png" : undefined
                                    }
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
                                {!playing && (
                                    <Box
                                        position={"absolute"}
                                        top="0"
                                        left={"0"}
                                        right={"0"}
                                        bottom={"0"}
                                        bg="rgba(0,0,0,0.5)"
                                    >
                                        <Center h="100%">
                                            <Button
                                                variant={"btnPlayVideo"}
                                                onClick={() => {
                                                    if (!isLoading) setPlaying(true);
                                                }}
                                                className="plz"
                                            >
                                                <Img src={"/images/play_button.svg"} w="10rem" h="10rem" />
                                            </Button>
                                        </Center>
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Center
                                flex="1"
                                h="100%"
                                bg="var(--primary-500)"
                                borderRadius={"1.6rem"}
                                w="100%"
                                p="1.5rem"
                            >
                                <Image
                                    maxH="100%"
                                    maxW="100%"
                                    src={media?.url}
                                    alt=""
                                    objectFit={"contain"}
                                    transition="transform .2s"
                                    fallbackSrc="/images/fallback-restaurant.jpeg"
                                    onClick={onOpen}
                                />
                            </Center>
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
                        {restaurantInfo?.medias.map((el, index) => {
                            const id = `media_${index}`;
                            if (el.type === MediaType.Image) {
                                return (
                                    <Image
                                        w="23.5rem"
                                        h="15.1rem"
                                        objectFit="cover"
                                        src={el.url}
                                        alt=""
                                        key={id}
                                        cursor={"pointer"}
                                        borderRadius={"1.6rem"}
                                        id={id}
                                        onClick={() => {
                                            onChangeMedia(el, id);
                                        }}
                                        fallbackSrc="/images/fallback-restaurant.jpeg"
                                        border={media.id == id ? "1px solid var(--gray-500)" : ""}
                                    />
                                );
                            }
                            return (
                                <ReactPlayer
                                    key={String(index)}
                                    playing={false}
                                    width="100%"
                                    height="15.1rem"
                                    style={{
                                        border: media.id == id ? "1px solid var(--gray-500)" : "",
                                        borderRadius: "1.6rem",
                                    }}
                                    url={el?.url}
                                    light={
                                        !media || (media && !media?.url) ? "/images/fallback-restaurant.png" : undefined
                                    }
                                    playsInline
                                    playIcon={<></>}
                                    stopOnUnmount
                                    id={id}
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
                                    onClick={() => {
                                        setPlaying(false);
                                        onChangeMedia(el, id);
                                    }}
                                />
                            );
                        })}
                    </Stack>
                </Stack>
                {isLoading ? (
                    <SkeletonBox mt="0.8rem" isLoaded={false} />
                ) : (
                    <VStack
                        w="100%"
                        alignItems={"flex-start"}
                        spacing={"1.6rem"}
                        padding="0.8rem 2.4rem"
                        position="relative"
                    >
                        <Stack w="100%" direction={{ md: "row", base: "column" }}>
                            <VStack flex={1} alignItems={"flex-start"}>
                                <Text fontSize={"2.4rem"} color="var(--gray-900)" fontWeight={"bold"} m="0">
                                    {restaurantInfo?.name?.[0].text}
                                </Text>
                                <Text fontSize={"1.8rem"} color="black" fontWeight={"600"} m="0">
                                    {restaurantInfo?.specialty?.[0]?.text} | {restaurantInfo?.top_food}
                                </Text>
                            </VStack>
                            <VStack w="33.6rem" alignItems={"flex-start"}>
                                <HStack spacing="0.8rem" w="100%">
                                    <HStack spacing="1px">
                                        <Img w="2.4rem" height={"2.4rem"} src="/images/star-icon1.svg" />
                                        <Text fontSize={"1.6rem"} color="var(--gray-500)" m="0" fontWeight={"500"}>
                                            {restaurantInfo?.rating}(100+)
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

                                {restaurantInfo?.promotion && (
                                    <HStack spacing="0">
                                        <Img w="2.4rem" height={"2.4rem"} src="/images/frame-2729.svg" />
                                        <Text fontSize={"1.6rem"} color="var(--gray-600)" m="0" fontWeight={"500"}>
                                            {restaurantInfo?.promotion ?? "-"}
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
                            </VStack>
                        </Stack>
                        <VStack spacing="0" alignItems="flex-start">
                            <Collapse in={isOpen} animateOpacity startingHeight={"4.8rem"}>
                                <Flex flexDir="column" minH="4.8rem">
                                    {restaurantInfo?.introduction?.map((el, index) => {
                                        return (
                                            <Fragment key={"introduction" + String(index)}>
                                                <Text
                                                    fontSize={"1.6rem"}
                                                    fontWeight={400}
                                                    lineHeight={"2.4rem"}
                                                    color="var(--gray-600)"
                                                >
                                                    {el?.text ?? "-"}
                                                </Text>
                                            </Fragment>
                                        );
                                    })}
                                </Flex>
                            </Collapse>
                            <Button h="2.4rem" variant={"btnViewAllSm"} onClick={onToggle} p="0">
                                {!isOpen ? t("SEE_MORE") : t("SEE_LESS")}
                            </Button>
                        </VStack>
                    </VStack>
                )}
            </VStack>
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
                                backgroundImage: `url("${media?.url}"), url("/images/fallback-restaurant.jpeg")`,
                            }}
                        ></Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default RestaurantGallery;
