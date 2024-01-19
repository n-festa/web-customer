import { poppins } from "@/theme/fonts";
import { Box, Flex, HStack, IconButton, Img, Text, VStack } from "@chakra-ui/react";

const GroupStars = () => {
    return (
        <HStack spacing="0.4rem">
            <Img w="2rem" h="2rem" alt="" src="/images/star-icon2.svg" />
            <Img w="2rem" h="2rem" alt="" src="/images/star-icon2.svg" />
            <Img w="2rem" h="2rem" alt="" src="/images/star-icon2.svg" />
            <Img w="2rem" h="2rem" alt="" src="/images/star-icon2.svg" />
            <Img w="2rem" h="2rem" alt="" src="/images/star-icon2.svg" />
        </HStack>
    );
};

const ReviewCard = ({ comment, isShowAuthor }: { isShowAuthor?: boolean; comment: string }) => {
    return (
        <VStack
            spacing="1.6rem"
            borderRadius="2.4rem"
            bg="var(--full-white)"
            boxShadow="0 3px 10px 3px rgba(240, 255, 219, 0.7)"
            border="1px solid var(--color-palegoldenrod)"
            overflow="hidden"
            p="4rem 3.2rem"
            height={{ md: "fit-content", base: "100%" }}
        >
            {isShowAuthor && (
                <Flex w="100%" display={{ base: "none", md: "flex" }} justifyContent="space-between">
                    <Flex gap="1.5rem">
                        <Img className="customer-avatar" alt="" src="/images/pic@2x.png" />
                        <VStack alignItems="flex-start" spacing="0">
                            <Text fontFamily={poppins.style.fontFamily} fontWeight="500" fontSize="1.5rem">
                                Alexander R.
                            </Text>
                            <Text color="var(--primary-500, #00473c)" fontSize="1.2rem" fontWeight="500">
                                Khách hàng thân thiết
                            </Text>
                        </VStack>
                    </Flex>
                    <Img
                        display={{
                            base: "none",
                            lg: "unset",
                        }}
                        alt=""
                        src="/images/path-173.svg"
                    />
                </Flex>
            )}
            <Text fontSize="1.8rem" lineHeight="2.4rem" fontWeight={600}>
                {comment}
            </Text>
            <GroupStars />
        </VStack>
    );
};
const Testimonial = () => {
    return (
        <Flex px="4.3rem" flexDir="column" pb="17.2rem" alignItems="center">
            <Text mt="15.6rem" mb="5.6rem" fontWeight="bold" fontSize="4.8rem" className="heading">
                Mọi người yêu thích 2All
            </Text>
            <HStack h="fit-content" spacing="1.6rem" alignItems="flex-start">
                <ReviewCard
                    isShowAuthor
                    comment={`“1. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao hàng nhanh
                chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt nhất.”`}
                />
                <ReviewCard
                    comment={`“2. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao
                    hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt nhất.”`}
                />
                <ReviewCard
                    comment={`“3. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao
                    hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt nhất.”`}
                />
            </HStack>
            <Flex
                mt={{ base: "5rem", md: "-4rem" }}
                alignSelf="stretch"
                mr={{ base: "unset", md: "5rem" }}
                justifyContent={{ base: "center", md: "flex-end" }}
                gap="3.2rem"
            >
                <IconButton
                    aria-label="paginator-arrow"
                    borderRadius="50%"
                    w="3.6rem"
                    h="3.6rem"
                    bg="var(--color-palegoldenrod)"
                    boxShadow="0 3px 10px 3px rgba(240, 255, 219, 0.7)"
                    border="1px solid var(--color-palegoldenrod)"
                    overflow="hidden"
                    backdropFilter="var(--background-blur-sm)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    icon={<Img className="small-icon" alt="" src="/images/chevronleft.svg" />}
                    className="paginator-arrow"
                />
                <HStack spacing="1.2rem" alignItems="center">
                    <Box className="pagination-dot-indicator active"></Box>
                    <Box className="pagination-dot-indicator"></Box>
                    <Box className="pagination-dot-indicator"></Box>
                </HStack>
                <IconButton
                    aria-label="paginator-arrow"
                    borderRadius="50%"
                    w="3.6rem"
                    h="3.6rem"
                    bg="var(--color-palegoldenrod)"
                    boxShadow="0 3px 10px 3px rgba(240, 255, 219, 0.7)"
                    border="1px solid var(--color-palegoldenrod)"
                    overflow="hidden"
                    backdropFilter="var(--background-blur-sm)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    icon={<Img className="small-icon" alt="" src="/images/chevronright.svg" />}
                    className="paginator-arrow"
                />
            </Flex>
        </Flex>
    );
};

export default Testimonial;
