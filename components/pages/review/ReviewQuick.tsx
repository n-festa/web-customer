import { Box, Button, Flex, Img, Text, Textarea } from "@chakra-ui/react";
import config from "@/config";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
const {
    review: { formData },
} = config;
const ReviewQuick = () => {
    return (
        <Box>
            <Flex
                p="2rem 0 1rem"
                borderBottom="1px solid var(--gray-300)"
                alignItems="center"
                justifyContent="space-between"
                mb="1rem"
            >
                <Flex gap="1.6rem" alignItems="center">
                    <Img w="4rem" height="3.8rem" src="/images/icons/icon_shipper.svg" />
                    <Text fontSize="1.8rem" fontWeight="bold">
                        Đánh giá tài xế
                    </Text>
                </Flex>
                <Flex>
                    {Array.from({ length: 5 }, (_, index) => (
                        <Img key={index} src="/images/icons/icon_star.svg" w="3.6rem" h="3.6rem" />
                    ))}
                </Flex>
            </Flex>
            <Flex p="2rem 0 1rem" alignItems="center" justifyContent="space-between" mb="1rem">
                <Flex gap="1.6rem" alignItems="center">
                    <Img w="4rem" height="3.8rem" src="/images/icons/icon_disk.svg" />
                    <Text fontSize="1.8rem" fontWeight="bold">
                        Đánh giá món ăn
                    </Text>
                </Flex>
                <Flex>
                    {Array.from({ length: 5 }, (_, index) => (
                        <Img key={index} src="/images/icons/icon_star.svg" w="3.6rem" h="3.6rem" />
                    ))}
                </Flex>
            </Flex>
            <Text mb="1rem" fontSize="1.6rem" fontWeight="400">
                Bạn có hài lòng về món ăn của chúng tôi không? Hãy cho chúng tôi biết ý kiến của bạn
            </Text>
            <GroupRadioButton
                isRounded
                options={formData.satisfied}
                defaultValue={"Đồ ăn chất lượng"}
                onChange={function (_value: string): void {
                    //
                }}
            ></GroupRadioButton>
            <Box m="1.8rem 0 1rem">
                <Textarea placeholder="Hãy chia sẻ nhận xét cho dịch vụ này bạn nhé!" minH="12.8rem" />
            </Box>
            <Flex>
                <Button variant="btnSubmit">Gửi đánh giá</Button>
            </Flex>
        </Box>
    );
};

export default ReviewQuick;
