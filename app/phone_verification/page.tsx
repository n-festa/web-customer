import InputForm from "@/components/InputForm";
import { Box, Text, Flex, RadioGroup, Stack, Radio, Button } from "@chakra-ui/react";
import config from "@/config";
import RadioCard from "@/components/RadioCard";
import UISignWrap from "@/components/UISignWrap";

const { form } = config;

const PhoneVerification = () => {
    return (
        <UISignWrap maxW="63rem" bg="var(--gray-100)">
            <Box p="4rem" w="100%" bg="white">
                <Text fontSize="2.4rem" fontWeight="700" mb="0.8rem" color="var(--gray-950)">
                    CHIA SẺ THÊM VỚI CHÚNG TÔI VỀ BẠN
                </Text>
                <Text fontSize="1.4rem" fontWeight="400" mb="3.2rem" color="var(--gray-600)">
                    Những thông tin bạn cung cấp sẽ giúp chúng tôi đưa ra những gợi ý về đồ ăn phù hợp hơn với thể trạng
                    và nhu cầu của bạn.
                </Text>
                <Box w="100%" maxW="36rem" m="0 auto">
                    <InputForm title="Tên" type="text" placeholder="Ví dụ: Nguyễn Văn A" />
                    <InputForm title="Email" type="email" placeholder="Ví dụ: nguyen.vana@email.com" />
                    <InputForm title="Ngày sinh" type="text" placeholder="Ví dụ: 27/07/1995" />
                    <RadioGroup mb="1.6rem">
                        <Stack direction="row" spacing={8}>
                            {form.gender.map((value, index) => (
                                <Radio
                                    variant="custom-width"
                                    key={index}
                                    className="custom-width"
                                    value={index.toString()}
                                    fontSize="1.6rem"
                                    fontWeight="400"
                                    color="var(--gray-700)"
                                    w="33.333%"
                                    h="1.6rem"
                                    size="lg"
                                    colorScheme="green"
                                >
                                    {value}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                    <Flex gap="1rem" mb="2rem">
                        <InputForm title="Chiều cao ( cm )" type="text" placeholder="Ví dụ: 163" />
                        <InputForm title="Cân nặng ( kg )" type="text" placeholder="Ví dụ: 58" />
                    </Flex>
                    <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem">
                        Mức độ vận động hàng ngày
                    </Text>
                    <Flex gap="0.8rem" mb="1.6rem">
                        {form.actiLevel.map((value, index) => {
                            return <RadioCard key={index}>{value}</RadioCard>;
                        })}
                    </Flex>
                    <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem">
                        Mức độ vận động hàng ngày
                    </Text>
                    <Flex gap="0.8rem" mb="1.6rem" flexWrap="wrap">
                        {form.eatCurrent.map((value, index) => {
                            return <RadioCard key={index}>{value}</RadioCard>;
                        })}
                    </Flex>
                    <InputForm
                        title="Dị ứng với đồ ăn (nếu có)"
                        type="text"
                        placeholder="Ví dụ: sữa động vật, trứng..."
                        note="Chia sẻ thêm về đồ ăn mà bạn bị dị ứng. Ví dụ: sữa động vật, trứng, hải sản (cá, tôm, cua...), thuỷ sản (cá, tôm, lươn...), các loại hạt (đậu nành, óc chố, hạnh nhân...)"
                    />
                    <InputForm
                        title="Bệnh mãn tính (nếu có)"
                        type="Ví dụ: Cao huyết áp..."
                        placeholder="Ví dụ: sữa động vật, trứng..."
                        note="Tim, Cao huyết áp, Huyết áp thấp, Gout, Tiểu đường, hen suyễn, ung thư...."
                    />
                    <RadioGroup mb="1.6rem">
                        <Stack direction="column" spacing={8}>
                            {form.eatExpect.map((value, index) => (
                                <Radio
                                    key={index}
                                    value={index.toString()}
                                    fontSize="1.6rem"
                                    fontWeight="400"
                                    color="var(--gray-700)"
                                    w="33.333%"
                                    h="1.6rem"
                                    size="lg"
                                    colorScheme="green"
                                >
                                    {value}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                    <Button
                        w="100%"
                        bg="#00473C"
                        colorScheme="#E6FF55"
                        fontSize="1.4rem"
                        fontWeight="600"
                        borderRadius="99.9rem"
                        h="3.6rem"
                        p="0.6rem 1.2rem"
                    >
                        Hoàn tất
                    </Button>
                </Box>
            </Box>
        </UISignWrap>
    );
};

export default PhoneVerification;
